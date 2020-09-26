import { Cookie } from "./Cookie";

type HttpRequest = {
    uri: string;
    method: "GET" | "POST";
    headers: {};
    body?: string;
}

export class Http {

    private static async makeRequest(request: HttpRequest): Promise<Response> {
        return await fetch(request.uri, {
            method: request.method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: request.headers,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: request.body ? request.body!! : ""
        });
    }

    static async get(uri = ''): Promise<Response> {
        const accessToken: string | undefined = Cookie.read("access_token");
        return await fetch(uri, {
            method: "GET",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': "application/x-www-form-urlencoded;charset=utf-8",
                'Authorization': `Bearer ${accessToken}`
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
    }

    static async post(uri = '', contentType: string, data: string): Promise<Response> {
        return Http.makeRequest(
            {
                uri: uri,
                method: "POST",
                headers: {
                    'Content-Type': contentType,
                    'Authorization': `Bearer ${Cookie.read("access_token")}`
                },
                body: data
            },
        );
    }

}