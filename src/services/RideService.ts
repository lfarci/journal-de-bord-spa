import { TrafficCondition } from "../components/pages/rides/form/fields";
import { Ride } from "../types";
import { AuthService } from "./AuthService";
import HttpService from "./HttpService";

export type RideData = {
    id?: number;
    departure: number;
    arrival?: number;
    trafficCondition: number;
    comment?: string;
}

export default class RideService {

    private static authentication = new AuthService();

    public static async create(data: RideData): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await HttpService.post<RideData>("/rides", data);
                if ("rideId" in response) {
                    resolve(response.rideId);
                } else {
                    reject(Error("No ride id in the response."));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async findById(rideId: number): Promise<Ride> {
        return new Promise(async (resolve, reject) => {
            try {
                const ride = await HttpService.get<Ride>(`/rides/${rideId}`);
                resolve(this.formatted(ride));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getAll(): Promise<Ride[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const rides = await HttpService.get<Ride[]>("/rides");
                resolve(rides.map(ride => this.formatted(ride)));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async updateById(rideId: number, data: RideData): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await HttpService.put<RideData>(`/rides/${rideId}`, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async deleteById(rideId: number): Promise<void> {
        return await HttpService.delete(`/rides/${rideId}`);
    }

    private static formatted = (ride: Ride): Ride => {
        ride.departure.moment = new Date(ride.departure.moment);
        if (isNaN(ride.departure.moment.getTime()))
            throw new Error("Invalid departure date.");
        if (ride.arrival) {
            ride.arrival.moment = new Date(ride.arrival.moment);
            if (isNaN(ride.arrival?.moment.getTime()))
                throw new Error("Invalid arrival date.");
        }
        ride.trafficCondition = (TrafficCondition as any)[ride.trafficCondition];
        return ride;
    }

}