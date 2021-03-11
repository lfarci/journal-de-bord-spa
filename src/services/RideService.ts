import axios from "axios";
import { User } from "oidc-client";
import { TrafficCondition } from "../components/pages/rides/form/fields";
import { Ride } from "../types";
import { makeRide } from "../types/__test__/helpers";
import { AuthService } from "./AuthService";
import { Environment } from "./Environment";

export default class RideService {

    private static authentication = new AuthService();

    public static async findById(rideId: number): Promise<Ride> {
        return new Promise(async (resolve, reject) => {
            if (this.authentication.isLoggedIn()) {
                const user = await this.authentication.getUser();
                const host = Environment.resourceServerUri;
                const path = `api/drivers/${user?.profile.sub}/rides/${rideId}`;

                console.log("Authenticated as " + user?.profile.nickname);

                const response = await axios.get(`${host}${path}`, {
                    headers: {
                        Authorization: `Bearer ${user?.access_token}`
                    }
                });

                if (response.status === 200) {
                    const data = response.data;
                    data.arrival.moment = new Date(data.arrival.moment);
                    data.departure.moment = new Date(data.departure.moment);
                    data.trafficCondition = TrafficCondition.CALM;
                    resolve(response.data);
                } else if (response.status === 404) {
                    reject(Error("Unknown ride, no id:" + rideId));
                } else {
                    reject(Error("Error while getting the ride."));
                }

            } else {
                reject(Error("No authenticated user."));
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

}