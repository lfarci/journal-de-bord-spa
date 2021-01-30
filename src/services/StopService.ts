import { Stop } from "../types";

import * as model from "./journal-de-bord-sample.json";
import { LocationService } from "./LocationService";

interface IStopServiceEntity {
    id: number,
    location: number,
    moment: string,
    odometerValue: number
}

export class StopService {

    public static DEFAULT = {
        location: LocationService.DEFAULT,
        moment: new Date(),
        odometerValue: 0
    };

    private static readStop =(stop: IStopServiceEntity): Stop => {
        let location = LocationService.findById(stop.location);
        if (!location) {
            location = LocationService.DEFAULT;
        }
        return {
            id: stop.id,
            location: location,
            moment: new Date(stop.moment),
            odometerValue: stop.odometerValue
        }
    }

    private static initialize = (): Stop[] => {
        return model.stops.map(stop => StopService.readStop(stop));
    }

    public static STOPS: Stop[] = StopService.initialize();

    public static exist = async (stopId: number): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(StopService.STOPS.find(s => s.id === stopId) !== undefined);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static findById = async (stopId: number): Promise<Stop | undefined> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(StopService.STOPS.find(s => s.id === stopId));
            } catch (error) {
               reject(error);
            }
        });
    }

    public static readStopById = (stopId: number): Stop => {
        const stop = model.stops.find(s => s.id === stopId);
        if (stop) {
            return StopService.readStop(stop);
        }
        return StopService.DEFAULT;
    }

    public static put = async (stop: Stop): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (stop.id && await StopService.exist(stop.id)) {
                    let outdated = await StopService.findById(stop.id);
                    if (outdated) await StopService.delete(outdated);
                } else {
                    StopService.STOPS.push(stop);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

    public static delete = async (stop: Stop): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (stop.id && await StopService.exist(stop.id)) {
                    const target = await StopService.findById(stop.id);
                    const index = StopService.STOPS.indexOf(target!!);
                    StopService.STOPS.slice(index, 1);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

}