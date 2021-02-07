import { Location } from "../types";

import * as model from "./journal-de-bord-sample.json";

export class LocationService {

    public static KEY = "locations";
    public static DEFAULT = { name: "Unknown", latitude: 0, longitude: 0 };

    private static readSequence = (): number => {
        return localStorage[`${LocationService.KEY}-seq`];
    }

    private static writeSequence = (value: number): void => {
        localStorage[`${LocationService.KEY}-seq`] = value;
    }

    public static writeToLocalStorage = (locations: Location[]): void => {
        localStorage.setItem(LocationService.KEY, JSON.stringify(locations));
        const ids = locations.map(l => l.id ? l.id : 0);
        LocationService.writeSequence(Math.max(...ids) + 1);
    }

    public static writeSampleToLocalStorage = (): void => {
        LocationService.writeToLocalStorage(model.locations);
    }

    public static readFromLocalStorage = (): Location[] => {
        return JSON.parse(localStorage[LocationService.KEY]);
    }

    public static exist = async (locationName: string): Promise<boolean> => {
        return new Promise(async (resolve, reject) => {
            try {
                const locations = LocationService.readFromLocalStorage();
                resolve(locations.find(l => l.name === locationName) !== undefined);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static findById = (locationId: number): Location | undefined => {
        const locations = LocationService.readFromLocalStorage();
        return locations.find(l => l.id === locationId);
    }

    public static findByName = async (locationName: string): Promise<Location | undefined> => {
        return new Promise(async (resolve, reject) => {
            try {
                const locations = LocationService.readFromLocalStorage();
                resolve(locations.find(l => l.name === locationName));
            } catch (error) {
               reject(error);
            }
        });
    }

    public static getAll = async (): Promise<Location[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(LocationService.readFromLocalStorage());
            } catch (error) {
               reject(error);
            }
        });
    }

    public static put = async (location: Location): Promise<number> => {
        return new Promise(async (resolve, reject) => {
            try {
                let locationId;
                if (await LocationService.exist(location.name)) {
                    let outdated = await LocationService.findByName(location.name);
                    locationId = outdated?.id;
                    if (outdated) await LocationService.delete(outdated);
                } else {
                    const seq = LocationService.readSequence();
                    locationId = seq;
                    LocationService.writeSequence(seq + 1);
                }
                const locations = LocationService.readFromLocalStorage();
                locations.push({...location, id: locationId});
                LocationService.writeToLocalStorage(locations);
                resolve(locationId!!);
            } catch (error) {
               reject(error);
            }
        });
    }

    public static delete = async (location: Location): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (await LocationService.exist(location.name)) {
                    const locations = LocationService.readFromLocalStorage();
                    const target = await LocationService.findByName(location.name);
                    const index = locations.indexOf(target!!);
                    locations.splice(index, 1);
                    LocationService.writeToLocalStorage(locations);
                }
                resolve();
            } catch (error) {
               reject(error);
            }
        });
    }

}