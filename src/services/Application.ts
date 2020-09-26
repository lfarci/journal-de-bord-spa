import { JsonWebToken } from "../types/JsonWebToken";
import { TokenRequestResponse } from "../types/TokenRequestResponse";
import { User } from "../types/User";
import { Cookie } from "./Cookie";
import { Http } from "./Http";

export class Application {

    static clientId: string = 'newClient';
    static redirectUri: string = 'http://localhost:3000';

    static isAuthenticated() {
        return Cookie.exist("access_token");
    }

    static async retrieveToken(code: string): Promise<TokenRequestResponse> {
        let params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', Application.redirectUri);
        params.append('client_id', Application.clientId);
        params.append('client_secret', 'newClientSecret');
        return new Promise(async (resolve, reject) => {
            console.log("Params: " + params.toString());
            try {
                const response: Response = await Http.post(
                    'http://localhost:8083/auth/realms/journal-de-bord/protocol/openid-connect/token',
                    'application/x-www-form-urlencoded;charset=utf-8',
                    params.toString()
                );
                const data: TokenRequestResponse = await response.json();
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    private static decodeSavedToken(): JsonWebToken {
        const token: string | undefined = Cookie.read("access_token");
        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } else {
            throw new Error("Could not decode the token because it was not saved");
        }
    }

    static getCurrentUser(): User {
        try {
            const decodedToken = Application.decodeSavedToken();
            return {
                id: decodedToken.sub,
                name: decodedToken.name,
                username: decodedToken.preferred_username,
                givenName: decodedToken.given_name,
                familyName: decodedToken.family_name
            };
        } catch (error) {
            throw new Error(`Could not read current user because: ${error.message}`);
        }
    }

    static login(): void {
        const baseUri = "http://localhost:8083/auth/realms/journal-de-bord/protocol/openid-connect/auth";
        const responseType = `response_type=code`;
        const scope = `scope=openid write read`;
        const clientId = "client_id=newClient";
        const redirectUri = "redirect_uri=http://localhost:3000";
        const authUri = `${baseUri}?${responseType}&${scope}&${clientId}&${redirectUri}`;
        console.log(`redirecting to: ${authUri}`);
        window.location.href = authUri;
    }

    static logout() {
        Cookie.remove("access_token");
        window.location.reload();
    }

    static saveToken(token: TokenRequestResponse) {
        const expirationTime: number = new Date().getTime() + (1000 * token.expires_in);
        Cookie.write("access_token", token.access_token, new Date(expirationTime));
        window.location.href = "http://localhost:3000";
    }

}