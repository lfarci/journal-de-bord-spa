import axios from "axios";
import { TrafficCondition } from "../components/pages/rides/form/fields";
import { Ride } from "../types";
import { AuthService } from "./AuthService";
import { Environment } from "./Environment";
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
            if (this.authentication.isLoggedIn()) {
                const user = await this.authentication.getUser();
                const host = Environment.resourceServerUri;
                const path = `/drivers/${user?.profile.sub}/rides/${0}`;
                const response = await axios.get(`${host}${path}`, {
                    headers: {
                        Authorization: `Bearer ${user?.access_token}`
                    }
                });
                resolve([]);
            } else {
                reject(Error("No authenticated user."));
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
        return new Promise(async (resolve, reject) => {
            if (this.authentication.isLoggedIn()) {
                const user = await this.authentication.getUser();
                const host = Environment.resourceServerUri;
                const path = `/drivers/${user?.profile.sub}/rides/${0}`;
                const response = await axios.get(`${host}${path}`, {
                    headers: {
                        Authorization: `Bearer ${user?.access_token}`
                    }
                });
                resolve();
            } else {
                reject(Error("No authenticated user."));
            }
        });
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