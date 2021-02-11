import { Stop } from "../../types";

import * as model from "./journal-de-bord-sample.json";
import { LocationService } from "./LocationService";

interface IStopServiceEntity {
    id: number,
    location: number,
    moment: string,
    odometerValue: number
}

export class StopService {

    public static KEY = "stops";
    public static DEFAULT = {
        location: LocationService.DEFAULT,
        moment: new Date(),
        odometerValue: 0
    };

    private static readSequence = (): number => {
        return localStorage[`${StopService.KEY}-seq`];
    }

    private static writeSequence = (value: number): void => {
        localStorage[`${StopService.KEY}-seq`] = value;
    }

    public static writeToLocalStorage = (stops: IStopServiceEntity[]): void => {
        localStorage.setItem(StopService.KEY, JSON.stringify(stops));
        const ids = stops.map(s => s.id ? s.id : 0);
        StopService.writeSequence(Math.max(...ids) + 1);
    }

    public static writeSampleToLocalStorage = (): void => {
        StopService.writeToLocalStorage(model.stops);
    }

    private static readEntitiesFromLocalStorage = (): IStopServiceEntity[] => {
        return JSON.parse(localStorage[StopService.KEY]);
    }

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

    public static readFromLocalStorage = (): Stop[] => {
        const entities = StopService.readEntitiesFromLocalStorage();
        return entities.map(StopService.readStop);
    }

    private static initialize = (): Stop[] => {
        return model.stops.map(stop => StopService.readStop(stop));
    }

    public static STOPS: Stop[] = StopService.initialize();

    public static exist = async (stopId: number): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                const stops = StopService.readFromLocalStorage();
                resolve(stops.find(s => s.id === stopId) !== undefined);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static findById = async (stopId: number): Promise<Stop | undefined> => {
        return new Promise(async (resolve, reject) => {
            try {
                const stops = StopService.readFromLocalStorage();
                resolve(stops.find(s => s.id === stopId));
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

    private static writeStop = async (stop: Stop): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                let locationId = await LocationService.put(stop.location);
                const entities = StopService.readEntitiesFromLocalStorage();
                entities.push({
                    id: stop.id!!,
                    location: locationId,
                    moment: stop.moment.toISOString(),
                    odometerValue: stop.odometerValue
                });
                StopService.writeToLocalStorage(entities);
                resolve();
            } catch (error) {
               reject(error);
            }
        });

    }

    public static put = async (stop: Stop): Promise<number> => {
        return new Promise(async (resolve, reject) => {
            try {
                let stopId: number;
                if (stop.id !== undefined && await StopService.exist(stop.id)) {
                    let outdated = await StopService.findById(stop.id);
                    stopId = outdated?.id!!;
                    if (outdated) await StopService.delete(outdated);
                } else {
                    const seq: number = StopService.readSequence();
                    stopId = seq;
                    StopService.writeSequence(seq + 1);
                }
                StopService.writeStop({...stop, id: stopId});
                resolve(stopId);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static delete = async (stop: Stop): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (stop.id !== undefined && await StopService.exist(stop.id)) {
                    const entities = StopService.readEntitiesFromLocalStorage();
                    const target = entities.find(e => e.id === stop.id);
                    const index = entities.indexOf(target!!);
                    entities.splice(index, 1);
                    StopService.writeToLocalStorage(entities);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

}