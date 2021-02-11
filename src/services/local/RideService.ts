import { Ride } from "../../types";
import { StopService } from "./StopService";
import * as model from "./journal-de-bord-sample.json";

interface IRideServiceEntity {
    id: number,
    departure: number,
    arrival: number,
    trafficCondition: number,
    comment: string
}

export class RideService {

    public static KEY = "rides";

    private static readSequence = (): number => {
        return localStorage[`${RideService.KEY}-seq`];
    }

    private static writeSequence = (value: number): void => {
        localStorage[`${RideService.KEY}-seq`] = value;
    }

    public static writeToLocalStorage = (rides: IRideServiceEntity[]): void => {
        localStorage.setItem(RideService.KEY, JSON.stringify(rides));
        const ids = rides.map(r => r.id ? r.id : 0);
        RideService.writeSequence(Math.max(...ids) + 1);
    }

    public static writeSampleToLocalStorage = (): void => {
        RideService.writeToLocalStorage(model.rides);
    }

    private static readRide =(ride: IRideServiceEntity): Ride => {
        return {
            id: ride.id,
            driverPseudonym: undefined,
            departure: StopService.readStopById(ride.departure),
            arrival: StopService.readStopById(ride.arrival),
            comment: ride.comment,
            trafficCondition: ride.trafficCondition
        }
    }

    private static readEntitiesFromLocalStorage = (): IRideServiceEntity[] => {
        return JSON.parse(localStorage[RideService.KEY]);
    }

    private static readFromLocalStorage = (): Ride[] => {
        const entities = RideService.readEntitiesFromLocalStorage();
        return entities.map(RideService.readRide);
    }

    public static exist = async (rideId: number): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                const rides = RideService.readFromLocalStorage();
                resolve(rides.find(r => r.id === rideId) !== undefined);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static findById = async (rideId: number): Promise<Ride | undefined> => {
        return new Promise(async (resolve, reject) => {
            try {
                const rides = RideService.readFromLocalStorage();
                resolve(rides.find(s => s.id === rideId));
            } catch (error) {
               reject(error);
            }
        });
    }

    public static getAll = async (userId: string): Promise<Ride[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(RideService.readFromLocalStorage());
            } catch (error) {
               reject(error);
            }
        });
    }

    private static writeRide = async (ride: Ride): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                await StopService.put(ride.departure);
                if (ride.arrival) await StopService.put(ride.arrival);
                const entities = RideService.readEntitiesFromLocalStorage();
                entities.push({
                    id: ride.id!!,
                    departure: ride.departure.id!!,
                    arrival: ride.arrival?.id!!,
                    trafficCondition: ride.trafficCondition,
                    comment: ride.comment ? ride.comment : ""
                });
                RideService.writeToLocalStorage(entities);
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

    public static put = async (ride: Ride): Promise<number> => {
        return new Promise(async (resolve, reject) => {
            try {
                let rideId: number;
                if (ride.id !== undefined && await RideService.exist(ride.id)) {
                    rideId = ride.id;
                    await RideService.deleteById(ride.id);
                } else {
                    const seq = RideService.readSequence();
                    rideId = seq;
                    RideService.writeSequence(seq + 1);
                }
                await RideService.writeRide({...ride, id: rideId});
                resolve(rideId);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static delete = async (ride: Ride): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (ride.id !== undefined && await RideService.exist(ride.id)) {
                    await RideService.deleteById(ride.id);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

    public static deleteById = async (rideId: number): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (await RideService.exist(rideId)) {
                    const entities = RideService.readEntitiesFromLocalStorage();
                    const target = entities.find(e => e.id === rideId);
                    const index = entities.indexOf(target!!);
                    entities.splice(index, 1);
                    RideService.writeToLocalStorage(entities);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

}