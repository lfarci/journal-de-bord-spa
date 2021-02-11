import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Location } from "../../types";
import { IStorage } from "./IStorage";

import * as model from "./journal-de-bord-sample.json";

export class LocationService {

    public static STORAGE: IStorage = localStorage;
    public static KEY = "locations";
    public static DEFAULT = { name: "Unknown", latitude: 0, longitude: 0 };

    public static readSequence = (): number | undefined => {
        const key = `${LocationService.KEY}-seq`;
        const item = LocationService.STORAGE.getItem(key);
        return item !== null ? parseInt(item!!): undefined;
    }

    public static writeSequence = (value: number): void => {
        const key: string = `${LocationService.KEY}-seq`;
        const sequence: string = value.toString();
        LocationService.STORAGE.setItem(key, sequence);
    }

    public static writeToLocalStorage = (locations: Location[]): void => {
        let sequence: number = 0;
        if (locations.length > 0) {
            const ids = locations.map(l => l.id ? l.id : 0);
            sequence = Math.max(...ids) + 1;
        }
        LocationService.STORAGE.setItem(LocationService.KEY, JSON.stringify(locations));
        LocationService.writeSequence(sequence);
    }

    public static writeSampleToLocalStorage = (): void => {
        LocationService.writeToLocalStorage(model.locations);
    }

    public static readFromLocalStorage = (): Location[] => {
        try {
            const parsable = LocationService.STORAGE.getItem(LocationService.KEY);
            if (parsable === null) {
                throw new Error("no locations to read in storage.");
            }
            return JSON.parse(parsable);
        } catch (error) {
            throw new Error("Could not read locations: " + error.message);
        }
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
        if (LocationService.STORAGE.getItem(LocationService.KEY)) {
            const locations = LocationService.readFromLocalStorage();
            return locations.find(l => l.id === locationId);
        }
        return undefined;
    }

    public static findByName = async (locationName: string): Promise<Location | undefined> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (LocationService.STORAGE.getItem(LocationService.KEY)) {
                    const locations = LocationService.readFromLocalStorage();
                    resolve(locations.find(l => l.name === locationName));
                }
                resolve(undefined);
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