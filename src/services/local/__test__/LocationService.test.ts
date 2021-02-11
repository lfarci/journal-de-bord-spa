import { LocationService } from "../LocationService";
import { DictionnaryStorage } from "./DictionaryStorage";
import { Location } from "../../../types";

beforeEach(() => LocationService.STORAGE = new DictionnaryStorage());

afterEach(() => LocationService.STORAGE = localStorage);

describe("writeSequence", () => {

    it("writes the sequence value as expected", () => {
        const key: string = `${LocationService.KEY}-seq`;
        LocationService.writeSequence(1);
        expect(LocationService.STORAGE.getItem(key)).toBe("1");
    });

    it("overwrites the sequence when already in storage", () => {
        const key: string = `${LocationService.KEY}-seq`;
        LocationService.writeSequence(1);
        LocationService.writeSequence(2);
        expect(LocationService.STORAGE.getItem(key)).toBe("2");
    });

});

describe("readSequence", () => {

    it("reads the sequence value as a number", () => {
        LocationService.writeSequence(1);
        const item = LocationService.readSequence();
        expect(typeof item).toBe("number");
    });

    it("reads the sequence with the expected value", () => {
        LocationService.writeSequence(1);
        expect(LocationService.readSequence()).toBe(1);
    });

    it("reads undefined when the sequence is not in storage", () => {
        expect(LocationService.readSequence()).toBe(undefined);
    });

});

describe("writeToLocalStorage", () => {

    const locations: Location[] = [
        {id: 0, name: "A", latitude: 0.0, longitude: 0.0 },
        {id: 1, name: "B", latitude: 0.0, longitude: 0.0 },
        {id: 2, name: "C", latitude: 0.0, longitude: 0.0 },
    ];

    it("writes an empty array string when no locations are provided", () => {
        LocationService.writeToLocalStorage([]);
        expect(LocationService.STORAGE.getItem("locations")).toBe("[]");
    });

    it("sequence is 0 if no locations are provided", () => {
        LocationService.writeToLocalStorage([]);
        expect(LocationService.readSequence()).toBe(0);
    });

    it("overwrites sequence with 0 when overwrite locations with empty array", () => {
        LocationService.writeSequence(10);
        LocationService.writeToLocalStorage([]);
        expect(LocationService.readSequence()).toBe(0);
    });

    it("writes locations as a JSON string", () => {
        LocationService.writeToLocalStorage(locations);
        const JSONString = JSON.stringify(locations);
        expect(LocationService.STORAGE.getItem("locations")).toBe(JSONString);
    });

    it("sequence is updated as expected when writing locations", () => {
        LocationService.writeToLocalStorage(locations);
        expect(LocationService.readSequence()).toBe(3);
    });

});

describe("readFromLocalStorage", () => {

    const locations: Location[] = [
        {id: 0, name: "A", latitude: 0.0, longitude: 0.0 },
        {id: 1, name: "B", latitude: 0.0, longitude: 0.0 },
        {id: 2, name: "C", latitude: 0.0, longitude: 0.0 },
    ];

    it("reads locations as expected parsing the JSON string in storage", () => {
        LocationService.writeToLocalStorage(locations);
        const result = LocationService.readFromLocalStorage();
        expect(JSON.stringify(result)).toBe(JSON.stringify(locations));
    });

    it("throws an error when there are no locations in the storage", () => {
        expect(() => LocationService.readFromLocalStorage()).toThrowError();
    });

    it("throws an error when the JSON string cannot be parsed", () => {
        LocationService.STORAGE.setItem("locations", "invalid JSON");
        expect(() => LocationService.readFromLocalStorage()).toThrowError();
    });

});

describe("exist", () => {

    const locations: Location[] = [
        {id: 0, name: "A", latitude: 0.0, longitude: 0.0 },
        {id: 1, name: "B", latitude: 0.0, longitude: 0.0 },
        {id: 2, name: "C", latitude: 0.0, longitude: 0.0 },
    ];

    it("returns true when a location with the given name is in storage", async () => {
        LocationService.writeToLocalStorage(locations);
        expect(await LocationService.exist("A")).toBeTruthy();
    });

    it("returns false when a location with the given name is not in storage", async () => {
        LocationService.writeToLocalStorage(locations);
        expect(await LocationService.exist("Unknown")).toBeFalsy();
    });

    it("returns false when there are no locations in storage", async () => {
        LocationService.writeToLocalStorage(locations);
        expect(await LocationService.exist("Unknown")).toBeFalsy();
    });

});

describe("findById", () => {

    const locations: Location[] = [
        {id: 0, name: "A", latitude: 0.0, longitude: 0.0 },
        {id: 1, name: "B", latitude: 0.0, longitude: 0.0 },
        {id: 2, name: "C", latitude: 0.0, longitude: 0.0 },
    ];

    it("finds the location with specified id when it is in storage", () => {
        LocationService.writeToLocalStorage(locations);
        expect(LocationService.findById(0)?.id).toBe(0);
    });

    it("returns undefined when a location with the given id is not in storage", () => {
        LocationService.writeToLocalStorage(locations);
        expect(LocationService.findById(10)).toBe(undefined);
    });

    it("returns undefined when there are no locations in storage", () => {
        expect(LocationService.findById(0)).toBe(undefined);
    });

});

describe("findByName", () => {

    const locations: Location[] = [
        {id: 0, name: "A", latitude: 0.0, longitude: 0.0 },
        {id: 1, name: "B", latitude: 0.0, longitude: 0.0 },
        {id: 2, name: "C", latitude: 0.0, longitude: 0.0 },
    ];

    it("finds the location with specified name when it is in storage", async () => {
        LocationService.writeToLocalStorage(locations);
        const location: Location | undefined = await LocationService.findByName("A");
        expect(location?.name).toBe("A");
    });

    it("returns undefined when a location with the given id is not in storage", async () => {
        LocationService.writeToLocalStorage(locations);
        expect(await LocationService.findByName("D")).toBe(undefined);
    });

    it("returns undefined when there are no locations in storage", async () => {
        expect(await LocationService.findByName("A")).toBe(undefined);
    });

});