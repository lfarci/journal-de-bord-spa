import axios, { AxiosRequestConfig } from "axios";
import { AuthService } from "./AuthService";
import { Environment } from "./Environment";

export default class HttpService {

    public static basePath = "api/drivers";
    private static authentication = new AuthService();

    public static async post<Entity>(url: string, data: Entity): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const config = await HttpService.makeRequestConfig();
                const response = await axios.post<Entity>(url, data, config);
                if (response.status === 201) {
                    resolve(response.data);
                } else {
                    reject(Error(`Error while posting resource to ${url}.`));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async exist<Entity>(url: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const config = await HttpService.makeRequestConfig();
                const response = await axios.head<Entity>(url, config);
                resolve(response.status === 200);
            } catch (error) {
                if (error.response.status === 404) {
                    resolve(false);
                } else {
                    reject(error);
                }
            }
        });
    }

    public static async get<Entity>(url: string): Promise<Entity> {
        return new Promise(async (resolve, reject) => {
            try {
                const config = await HttpService.makeRequestConfig();
                const response = await axios.get<Entity>(url, config);
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(Error("Error while getting resource."));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async put<Entity>(url: string, data: Entity): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const config = await HttpService.makeRequestConfig();
                const response = await axios.put<Entity>(url, data, config);
                if (response.status === 204) {
                    resolve();
                } else {
                    reject(Error("Error while updating resource."));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async delete(url: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const config = await HttpService.makeRequestConfig();
                const response = await axios.delete(url, config);
                if (response.status === 204) {
                    resolve();
                } else {
                    reject(Error("Error while deleting resource."));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    private static async requireValidAuthentication(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (!new AuthService().isLoggedIn()) {
                reject(Error("No authenticated user."));
            }
            const user = await this.authentication.getUser();
            if (!user?.profile.sub) {
                reject(Error("Could not find the user id."));
            }
            resolve();
        });

    }

    private static getAccessToken(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                await HttpService.requireValidAuthentication();
                const user = await this.authentication.getUser();
                if (user?.access_token) {
                    resolve(user?.access_token);
                } else {
                    reject(Error("Could not get the access token."));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getUserIdentifier(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                await HttpService.requireValidAuthentication();
                const user = await this.authentication.getUser();
                if (user?.profile.sub) {
                    resolve(user?.profile.sub);
                } else {
                    reject(Error("Could not get the user identifier."));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async makeUrlForCurrentDriver(resource: string = ""): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const userId = await HttpService.getUserIdentifier();
                const host: string = Environment.resourceServerUri;
                resolve(`${host}/${HttpService.basePath}/${userId}${resource}`);
            } catch (error) {
                reject(error);
            }
        });
    }

    private static async makeRequestConfig(): Promise<AxiosRequestConfig> {
        return new Promise(async (resolve, reject) => {
            try {
                const accessToken = await HttpService.getAccessToken();
                resolve({ headers: { 
                    Authorization: `Bearer ${accessToken}`
                } });
            } catch (error) {
                reject(error);
            }
        });
    }

}