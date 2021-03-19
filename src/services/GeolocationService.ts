import { Location } from "../types";

interface GeolocationCoordinates {
    readonly accuracy: number;
    readonly altitude: number | null;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number | null;
}

interface GeolocationPosition {
    readonly coords: GeolocationCoordinates;
    readonly timestamp: number;
}

interface GeolocationPositionError {
    readonly code: number;
    readonly message: string;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
}

export class GeolocationService {
    
    public static OPTIONS: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    };

    static getCurrentPosition = async (): Promise<GeolocationPosition> =>  {
        return new Promise(async (resolve, reject) => {
            const onSuccess = (position: GeolocationPosition) => resolve(position);
            const onError = (error: GeolocationPositionError) => reject(error);
            try {
                navigator.geolocation.getCurrentPosition(onSuccess, onError, GeolocationService.OPTIONS);
            } catch (error) {
               reject(error);
            }
        });
    }

    static makeCurrentLocation = async (locationName: string): Promise<Location | undefined> => {
        return new Promise(async (resolve, reject) => {
            try {
                const position = await GeolocationService.getCurrentPosition();
                resolve({
                    name: locationName,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            } catch (error) {
                resolve(undefined);
            }
        });
    }

}