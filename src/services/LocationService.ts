import axios from "axios";
import { TrafficCondition } from "../components/pages/rides/form/fields";
import { Ride } from "../types";
import { AuthService } from "./AuthService";
import { Environment } from "./Environment";
import HttpService from "./HttpService";

export type LocationData = {
    id?: number;
    name: string,
    longitude: number;
    latitude: number;
}

export default class LocationService {

    public static async create(data: LocationData): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await HttpService.post<LocationData>(`/locations`, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getAll(): Promise<LocationData[]> {
        return await HttpService.get<LocationData[]>(`/locations`);
    }

}