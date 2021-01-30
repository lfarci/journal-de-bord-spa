import { Location } from "../types";

import * as model from "./journal-de-bord-sample.json";

export class LocationService {

    public static DEFAULT = { name: "Unkown", latitude: 0, longitude: 0 };
    public static LOCATIONS: Location[] = model.locations;

    public static exist = async (locationName: string): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(LocationService.LOCATIONS.find(l => l.name === locationName) !== undefined);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static findById = (locationId: number): Location | undefined => {
        return LocationService.LOCATIONS.find(l => l.id === locationId);
    }

    public static findByName = async (locationName: string): Promise<Location | undefined> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(LocationService.LOCATIONS.find(l => l.name === locationName));
            } catch (error) {
               reject(error);
            }
        });
    }

    public static getAll = async (): Promise<Location[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(LocationService.LOCATIONS);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static put = async (location: Location): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (await LocationService.exist(location.name)) {
                    let outdated = await LocationService.findByName(location.name);
                    if (outdated) await LocationService.delete(outdated);
                } else {
                    LocationService.LOCATIONS.push(location);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

    public static delete = async (location: Location): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (await LocationService.exist(location.name)) {
                    const target = await LocationService.findByName(location.name);
                    const index = LocationService.LOCATIONS.indexOf(target!!);
                    LocationService.LOCATIONS.splice(index, 1);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

}