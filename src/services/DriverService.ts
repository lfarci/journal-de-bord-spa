import { Driver } from "../types/Driver";
import { AuthService } from "./AuthService";
import HttpService from "./HttpService";

export default class DriverService {

    public static async getCurrentDriver(): Promise<Driver | undefined> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await new AuthService().getUser();
                if (user) {
                    if (await HttpService.exist("")) {
                        resolve(await HttpService.get<Driver>(""))
                    } else {
                        resolve(undefined);
                    }
                } else {
                    reject(Error("Not logged in."));
                }
            } catch (error) {
                console.log("Catching an error")
                reject(error);
            }
        });
    }

    public static async create(data: Driver): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await HttpService.post<Driver>(`/drivers`, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

}