import { Http } from "./Http";

export class WebService {

    static async getRides(username:  string): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            try {
                const response: Response = await Http.get("http://localhost:8080/api/drivers/lofaloa/rides");
                console.log(JSON.stringify(await response.json()));
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

}