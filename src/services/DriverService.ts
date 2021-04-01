import { DriverStatistics } from "../types";
import { Driver } from "../types/Driver";
import { Environment } from "./Environment";
import HttpService from "./HttpService";

export default class DriverService {

    public static async getCurrentDriver(): Promise<Driver | undefined> {
        return new Promise(async (resolve, reject) => {
            try {
                const userUrl = await HttpService.makeUrlForCurrentDriver();
                if (await HttpService.exist(userUrl)) {
                    resolve(await HttpService.get<Driver>(userUrl))
                } else {
                    resolve(undefined);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getDriverStatistics(): Promise<DriverStatistics | undefined> {
        return new Promise(async (resolve, reject) => {
            try {
                const userUrl = await HttpService.makeUrlForCurrentDriver("/statistics");
                if (await HttpService.exist(userUrl)) {
                    resolve(await HttpService.get<DriverStatistics>(userUrl))
                } else {
                    resolve(undefined);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async create(data: Driver): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const host: string = Environment.resourceServerUri;
                await HttpService.post<Driver>(`${host}${HttpService.basePath}`, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}