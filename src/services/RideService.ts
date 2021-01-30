import { Ride } from "../types";
import * as model from "./journal-de-bord-sample.json";
import { StopService } from "./StopService";

interface IRideServiceEntity {
    id: number,
    departure: number,
    arrival: number,
    trafficCondition: number,
    comment: string
}

export class RideService {

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

    private static initialize = (): Ride[] => {
        return model.rides.map(ride => RideService.readRide(ride));
    }

    public static RIDES: Ride[] = RideService.initialize();

    public static exist = async (rideId: number): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(RideService.RIDES.find(r => r.id === rideId) !== undefined);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static findById = async (rideId: number): Promise<Ride | undefined> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(RideService.RIDES.find(s => s.id === rideId));
            } catch (error) {
               reject(error);
            }
        });
    }

    public static getAll = async (userId: string): Promise<Ride[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(RideService.RIDES);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static put = async (ride: Ride): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (ride.id && await RideService.exist(ride.id)) {
                    let outdated = await RideService.findById(ride.id);
                    if (outdated) await RideService.delete(outdated);
                } else {
                    RideService.RIDES.push(ride);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

    public static delete = async (ride: Ride): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (ride.id && await RideService.exist(ride.id)) {
                    const target = await RideService.findById(ride.id);
                    const index = RideService.RIDES.indexOf(target!!);
                    RideService.RIDES.slice(index, 1);
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
                    const target = await RideService.findById(rideId);
                    const index = RideService.RIDES.indexOf(target!!);
                    RideService.RIDES.splice(index, 1);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

}