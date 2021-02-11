import { IStorage } from "../IStorage";

interface IDictionary<T> {
    [key: string]: T;
}

export class DictionnaryStorage implements IStorage {

    private _dictionary: IDictionary<string>;

    constructor() {
        this._dictionary = {};
    }

    getItem = (key: string): string | null => {
        let item = null;
        if (key in this._dictionary) {
            item = this._dictionary[key];
        }
        return item;
    };

    setItem = (key: string, value: string): void => {
        this._dictionary[key] = value;
    };

}