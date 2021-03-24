import HttpService from "./HttpService";

export type LocationData = {
    id?: number;
    name: string,
    longitude: number;
    latitude: number;
}

export default class LocationService {

    public static async create(data: LocationData): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const url = await HttpService.makeUrlForCurrentDriver("/locations");
                await HttpService.post<LocationData>(url, data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getAll(): Promise<LocationData[]> {
        return await HttpService.get<LocationData[]>(`/locations`);
    }

}