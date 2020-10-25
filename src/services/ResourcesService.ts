import { Ride } from "../types";
import { Environment } from "./Environment";
import * as data from "./sample.json";

export class ResourcesService {

    private _resourceServerUri: string;

    constructor() {
        this._resourceServerUri = Environment.resourceServerUri;
    }

    private async sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async getObjective(userId: string): Promise<number> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.sleep(1000);
                resolve(data.objective);
            } catch (error) {
               reject(error);
            }
        });
    }

    /**
     * Gets all the rides driven by the specified user.
     *
     * @param userId is the identifier of the specified user.
     */
    public async getRides(userId: string): Promise<Ride[]> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.sleep(1000);
                resolve(ResourcesService.readRidesFromSample());
            } catch (error) {
               reject(error);
            }
        });
    }

    /**
     * This method only serve for demo purposes.
     */
    private static readRidesFromSample(): Ride[] {
        return data.rides.map((element, index) => ({
            id: index,
            driverPseudonym: element.driverPseudonym,
            departure: {
                moment: new Date(element.departure.moment),
                location: {
                    id: element.departure.location.id,
                    name: element.departure.location.name,
                    longitude: element.departure.location.longitude,
                    latitude: element.departure.location.latitude
                },
                odometerValue: element.departure.odometerValue
            },
            arrival: {
                moment: new Date(element.arrival.moment),
                location: {
                    id: element.arrival.location.id,
                    name: element.arrival.location.name,
                    longitude: element.arrival.location.longitude,
                    latitude: element.arrival.location.latitude
                },
                odometerValue: element.arrival.odometerValue
            },
            comment: element.comment,
            trafficCondition: element.trafficCondition
        }));
    }

}