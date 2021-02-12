import { LocationService } from "../LocationService";
import { DictionnaryStorage } from "./DictionaryStorage";
import { Location } from "../../../types";
import { IStorage } from "../IStorage";

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

describe("getAll", () => {

    it("resolves the expected number of locations", async () => {
        LocationService.writeToLocalStorage([
            {id: 0, name: "A", latitude: 0.0, longitude: 0.0 },
            {id: 1, name: "B", latitude: 0.0, longitude: 0.0 },
            {id: 2, name: "C", latitude: 0.0, longitude: 0.0 },
        ]);
        expect((await LocationService.getAll()).length).toBe(3);
    });

    it("resolves locations with the expected name", async () => {
        LocationService.writeToLocalStorage([
            {id: 0, name: "Library", latitude: 0.0, longitude: 0.0 },
        ]);
        expect((await LocationService.getAll())[0].name).toBe("Library");
    });

    it("resolves an empty array when there are no locations in the storage", async () => {
        expect((await LocationService.getAll()).length).toBe(0);
    });

    it("resolves an empty array when the JSON in storage is invalid", async () => {
        LocationService.STORAGE.setItem(LocationService.KEY, "invalid JSON");
        expect((await LocationService.getAll()).length).toBe(0);
    });

});

describe("put", () => {

    const initialize = (storage: IStorage) => {
        storage.setItem(LocationService.KEY, "[]");
        storage.setItem(`${LocationService.KEY}-seq`, "0");
    }

    it("puts new locations with an id", async () => {
        initialize(LocationService.STORAGE);
        await LocationService.put(
            {name: "Library", latitude: 0.0, longitude: 0.0 }
        );
        expect((await LocationService.findByName("Library"))?.id).toBe(0);
    });

    it("overwrites the location with the same name that is already in storage", async () => {
        initialize(LocationService.STORAGE);
        await LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 });
        await LocationService.put({name: "A", latitude: 1.0, longitude: 1.0 });
        expect((await LocationService.getAll())[0].name).toBe("A");
        expect((await LocationService.getAll())[0].latitude).toBe(1.0);
        expect((await LocationService.getAll())[0].longitude).toBe(1.0);
    });

    it("puts once after multiple calls with the same location", async () => {
        initialize(LocationService.STORAGE);
        await LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 });
        await LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 });
        await LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 });
        expect((await LocationService.getAll()).length).toBe(1);
    });

    it("the new location id is the one of the outdated one after overwrite", async () => {
        initialize(LocationService.STORAGE);
        await LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 });
        const outdated = await LocationService.findByName("A");
        await LocationService.put({name: "A", latitude: 1.0, longitude: 1.0 });
        const updated = await LocationService.findByName("A");
        expect(outdated?.id).toBe(updated?.id);
    });

    it("sets a new location id to the sequence value", async () => {
        initialize(LocationService.STORAGE);
        LocationService.writeSequence(237);
        await LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 });
        const location = await LocationService.findByName("A");
        expect(location?.id).toBe(237);
    });

    it("resolves the sequence id when the location is not in storage", async () => {
        initialize(LocationService.STORAGE);
        LocationService.writeSequence(237);
        const id = await LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 });
        expect(id).toBe(237);
    });

    it("resolves the updated location id when overwriting", async () => {
        initialize(LocationService.STORAGE);
        const outdated = await LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 });
        const updated = await LocationService.put({name: "A", latitude: 1.0, longitude: 1.0 });
        expect(outdated).toBe(updated);
    });

    it("increments the sequence value after putting a new location", async () => {
        initialize(LocationService.STORAGE);
        LocationService.writeSequence(237);
        await LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 });
        expect(LocationService.readSequence()).toBe(238);
    });

    it("throws an error when the storage locations has not been initialized", async () => {
        LocationService.writeSequence(0);
        await expect(
            LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 })
        ).rejects.toThrowError();
    });

    it("throws an error when the storage sequence has not been initialized", async () => {
        LocationService.STORAGE.setItem("locations", "[]");
        await expect(
            LocationService.put({name: "A", latitude: 0.0, longitude: 0.0 })
        ).rejects.toThrowError();
    });

});

describe("getAll", () => {

    it("resolves the expected number of locations", async () => {
        LocationService.writeToLocalStorage([
            {id: 0, name: "A", latitude: 0.0, longitude: 0.0 },
            {id: 1, name: "B", latitude: 0.0, longitude: 0.0 },
            {id: 2, name: "C", latitude: 0.0, longitude: 0.0 },
        ]);
        expect((await LocationService.getAll()).length).toBe(3);
    });

    it("resolves locations with the expected name", async () => {
        LocationService.writeToLocalStorage([
            {id: 0, name: "Library", latitude: 0.0, longitude: 0.0 },
        ]);
        expect((await LocationService.getAll())[0].name).toBe("Library");
    });

    it("resolves an empty array when there are no locations in the storage", async () => {
        expect((await LocationService.getAll()).length).toBe(0);
    });

    it("resolves an empty array when the JSON in storage is invalid", async () => {
        LocationService.STORAGE.setItem(LocationService.KEY, "invalid JSON");
        expect((await LocationService.getAll()).length).toBe(0);
    });

});

describe("delete", () => {

    const initialize = (storage: IStorage) => {
        storage.setItem(LocationService.KEY, "[]");
        storage.setItem(`${LocationService.KEY}-seq`, "0");
    }

    it("keeps all location when trying to delete an unknown location", async () => {
        initialize(LocationService.STORAGE);
        await LocationService.put({ name: "A", latitude: 0.0, longitude: 0.0 });
        await LocationService.put({ name: "B", latitude: 0.0, longitude: 0.0 });
        await LocationService.put({ name: "C", latitude: 0.0, longitude: 0.0 });
        const unknown = {id: 0, name: "Library", latitude: 0.0, longitude: 0.0 };
        await LocationService.delete(unknown);
        expect((await LocationService.getAll()).length).toBe(3);
    });

    it("deletes the expected location", async () => {
        initialize(LocationService.STORAGE);
        const location = { name: "C", latitude: 0.0, longitude: 0.0 };
        await LocationService.put(location);
        expect(await LocationService.exist(location.name)).toBeTruthy();
        await LocationService.delete(location);
        expect(await LocationService.exist(location.name)).toBeFalsy();
    });

    it("deletes exclusively the expected location", async () => {
        initialize(LocationService.STORAGE);
        const target = { name: "A", latitude: 0.0, longitude: 0.0 };
        await LocationService.put({ name: "B", latitude: 0.0, longitude: 0.0 });
        await LocationService.put(target);
        await LocationService.put({ name: "C", latitude: 0.0, longitude: 0.0 });
        await LocationService.delete(target);
        expect(await LocationService.exist("A")).toBeFalsy();
        expect(await LocationService.exist("B")).toBeTruthy();
        expect(await LocationService.exist("C")).toBeTruthy();
    });

});
