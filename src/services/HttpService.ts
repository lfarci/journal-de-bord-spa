import axios from "axios";
import { AuthService } from "./AuthService";
import { Environment } from "./Environment";

export default class HttpService {

    private static basePath = "api/drivers";
    private static authentication = new AuthService();

    private static makeUrl = (userId:string, resource: string) => {
        const host: string = Environment.resourceServerUri;
        return `${host}${HttpService.basePath}/${userId}${resource}`;
    }

    public static async get<Entity>(path: string): Promise<Entity> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!new AuthService().isLoggedIn()) {
                    reject(Error("No authenticated user."));
                }
                const user = await this.authentication.getUser();
                if (!user?.profile.sub) {
                    reject(Error("Could not find the user id."));
                }
                const response = await axios.get<Entity>(
                    this.makeUrl(user?.profile.sub!!, path), {
                    headers: {
                        Authorization: `Bearer ${user?.access_token}`
                    }
                });
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


}