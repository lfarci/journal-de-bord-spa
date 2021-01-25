import { getRideDistance, RecentRide, Ride } from "../types";
import { Progress } from "../types/Progress";
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

    /**
     * Gets the objective of the user with the specified id. The objective is
     * expressed in number of kilometers.
     *
     * TODO: the objective should be fetch from the backend.
     *
     * @param userId is the id of the user to get the picture for.
     */
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
     * Gets the uri to the picture of the user with the specified id. If the
     * user has no defined picture then a uri to a placeholder is returned.
     *
     * @param userId is the id of the user to get the picture for.
     */
    public async getImageUri(userId: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.sleep(1000);
                resolve(data.user.image);
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

    public async getRide(userId: string, rideId: string): Promise<Ride> {
        return new Promise(async (resolve, reject) => {
            try {
                const rides: Ride[] = await this.getRides(userId);
                let id: number;
                try {
                    id = parseInt(rideId)
                } catch (error) {
                    id = 0; 
                }
                await this.sleep(1000);
                resolve(rides[id]);
            } catch (error) {
               reject(error);
            }
        });
    }

    private adaptedRecentRides = (rides: Ride[]): RecentRide[] => {
		return rides.map(ride => ({
			id: ride.id!!,
			departureLocationName: ride.departure.location.name!!,
			arrivalLocationName: ride.arrival?.location.name!!,
			date: ride.arrival?.moment!!,
			distance: getRideDistance(ride)
		}));
	}

    /**
     * Gets the top most recent rides driven by the specified user.
     *
     * @param userId is the identifier of the specified user.
     * @param top is the number of the most recent rides to select.
     */
    public async getRecentRides(userId: string, top = 5): Promise<RecentRide[]> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.sleep(1000);
                const rides = ResourcesService.readRidesFromSample();
                resolve(this.adaptedRecentRides(rides).slice(0, top));
            } catch (error) {
               reject(error);
            }
        });
    }

    /**
     * Gets the progress for the specified user.
     *
     * @param userId is the identifier of the specified user.
     */
    public async getProgress(userId: string): Promise<Progress> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.sleep(1000);
                resolve({
                    drivenDistance: ResourcesService.readTotalDistanceFromSample(),
                    distanceObjective: await this.getObjective(userId)
                });
            } catch (error) {
               reject(error);
            }
        });
    }

    public async deleteJournal(userId: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.sleep(1000);
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

    public async postRide(ride: Ride): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.sleep(1000);
                console.log(JSON.stringify(ride, null, 2));
                resolve();
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

    private static readTotalDistanceFromSample(): number {
        const rides: Ride[] = this.readRidesFromSample();
        let totalDistance = 0;
        rides.forEach(ride => {
            if (ride.departure && ride.arrival) {
                let rideDistance = ride.arrival.odometerValue - ride.departure.odometerValue;
                totalDistance += rideDistance;
            }
        });
        return totalDistance;
    }

}