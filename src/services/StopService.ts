import { Stop } from "../types";
import HttpService from "./HttpService";

export type StopData = {
    id?: number;
    locationId: number,
    moment: string;
    odometerValue: number;
}

export default class StopService {

    private static async updateById(stopId: number, data: StopData): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await HttpService.put<StopData>(`/stops/${stopId}`, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    private static makeStopData(stop: Stop): StopData {
        if (!stop.location?.id && !stop.moment) {
            throw new Error("Invalid stop.");
        }
        return {
            id: stop.id,
            locationId: stop.location.id!!,
            moment: stop.moment.toISOString(),
            odometerValue: stop.odometerValue
        };
    }

    public static async update(stop: Stop): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = StopService.makeStopData(stop);
                await HttpService.put<StopData>(`/stops/${stop.id}`, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}