import { Stop } from "../types";
import HttpService from "./HttpService";

export type StopData = {
    id?: number;
    locationId: number,
    moment: string;
    odometerValue: number;
}

export default class StopService {

    public static async create(stop: Stop): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = StopService.makeStopData(stop);
                const url = await HttpService.makeUrlForCurrentDriver("/stops");
                const response = await HttpService.post<StopData>(url, data);
                if ("stopId" in response) {
                    resolve(response.stopId);
                } else {
                    reject(Error("No stop id was provided in the response."));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async update(stop: Stop): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = StopService.makeStopData(stop);
                const url = await HttpService.makeUrlForCurrentDriver(`/stops/${stop.id}`);
                await HttpService.put<StopData>(url, data);
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

}