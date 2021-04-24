import { TrafficCondition } from "../components/pages/rides/form/fields";
import { getRideDistance, Ride } from "../types";
import { RecentRide } from "../types/RecentRide";
import HttpService from "./HttpService";

export type RideData = {
    id?: number;
    departure: number;
    arrival?: number;
    trafficCondition: number;
    comment?: string;
}

export type RidesData = {
    rides: Ride[];
    totalPages: number;
    isLastPage: boolean;
}

const recentRides = (rides: Ride[]): RecentRide[] => {
    return rides.map(ride => ({
        id: ride.id === undefined ? 0 : ride.id,
        departureLocationName: ride.departure.location.name,
        arrivalLocationName: ride.arrival?.location.name === undefined ? "" : ride.arrival?.location.name,
        distance: getRideDistance(ride),
        date: ride.departure.moment
    }));
}

export const getRecentRides = async (top: number = 5): Promise<RecentRide[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await RideService.getAll(0, top);
            resolve(recentRides(data.rides));
        } catch (error) {
            reject(error);
        }
    });
}

export const isLastRideFinished = async (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await RideService.getAll(0, 1);
            let isLastRideFinished = data.rides.length === 0
                ? true
                : data.rides[0].arrival !== null;
            resolve(isLastRideFinished);
        } catch (error) {
            reject(error);
        }
    });
}

export default class RideService {

    public static async create(data: RideData): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const url = await HttpService.makeUrlForCurrentDriver("/rides");
                const response = await HttpService.post<RideData>(url, data);
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
                const url = await HttpService.makeUrlForCurrentDriver(`/rides/${rideId}`);
                const ride = await HttpService.get<Ride>(url);
                resolve(this.formatted(ride));
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getAll(page: number = 0, size: number = 10): Promise<RidesData> {
        return new Promise(async (resolve, reject) => {
            try {
                const path = `/rides?page=${page}&size=${size}`;
                const url = await HttpService.makeUrlForCurrentDriver(path);
                const data = await HttpService.get<RidesData>(url);
                data.rides = data.rides.map(ride => this.formatted(ride));
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    private static recentRides(rides: Ride[]): RecentRide[] {
        return rides.map(ride => ({
            id: ride.id === undefined ? 0 : ride.id,
            departureLocationName: ride.departure.location.name,
            arrivalLocationName: ride.arrival?.location.name === undefined ? "" : ride.arrival?.location.name,
            distance: getRideDistance(ride),
            date: ride.departure.moment
        }));
    }

    public static async getRecentRides(top: number = 5): Promise<RecentRide[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getAll(0, top);
                resolve(this.recentRides(data.rides));
            } catch (error) {
                reject(error);
            }
        });
    }


    public static async updateById(rideId: number, data: RideData): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const url = await HttpService.makeUrlForCurrentDriver(`/rides/${rideId}`);
                await HttpService.put<RideData>(url, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async deleteById(rideId: number): Promise<void> {
        return await HttpService.delete(
            await HttpService.makeUrlForCurrentDriver(`/rides/${rideId}`)
        );
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