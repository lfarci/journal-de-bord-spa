import { JsonWebToken } from "../types/JsonWebToken";
import { TokenRequestResponse } from "../types/TokenRequestResponse";
import { User } from "../types/User";
import { Cookie } from "./Cookie";
import { Http } from "./Http";
import { JsonWebTokenUtils } from "./JsonWebTokenUtils";

export class Application {

    static accessTokenCookieKey: string = "access_token";

    static clientId: string = Application.getEnvironmentVariable("REACT_APP_CLIENT_ID");
    static clientSecret: string = Application.getEnvironmentVariable("REACT_APP_CLIENT_SECRET");
    static authServerTokenUri: string = Application.getEnvironmentVariable("REACT_APP_AUTH_SERVER_TOKEN_URI");
    static authServerLoginUri: string = Application.getEnvironmentVariable("REACT_APP_AUTH_SERVER_LOGIN_URI");
    static redirectUri: string = Application.getEnvironmentVariable("REACT_APP_REDIRECT_URI");

    static isAuthenticated() {
        return Cookie.exist(this.accessTokenCookieKey);
    }

    static getCurrentUser(): User {
        try {
            const decodedToken = Application.decodeSavedAccessToken();
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
        const baseUri = this.authServerLoginUri;
        const responseType = `response_type=code`;
        const scope = `scope=openid write read`;
        const clientId = `client_id=${this.clientId}`;
        const redirectUri = `redirect_uri=${this.redirectUri}`;
        const authUri = `${baseUri}?${responseType}&${scope}&${clientId}&${redirectUri}`;
        window.location.href = authUri;
    }

    static logout(): void {
        Cookie.remove(this.accessTokenCookieKey);
        window.location.reload();
    }

    static saveToken(token: TokenRequestResponse): void {
        if (this.redirectUri === undefined) {
            throw new Error("Cannot save token because the redirect URI variable is not defined");
        }
        if (!JsonWebTokenUtils.isValid(token.access_token)) {
            throw new Error(`Cannot save the token because it isn't valid: ${token}`);
        }
        const expirationTime: number = new Date().getTime() + (1000 * token.expires_in);
        Cookie.write(this.accessTokenCookieKey, token.access_token, new Date(expirationTime));
        window.location.href = this.redirectUri;

    }

    static async retrieveToken(code: string): Promise<TokenRequestResponse> {
        let params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', this.redirectUri);
        params.append('client_id', this.clientId);
        params.append('client_secret', this.clientSecret);
        return new Promise(async (resolve, reject) => {
            try {
                const response: Response = await Http.post(
                    this.authServerTokenUri,
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

    private static getEnvironmentVariable(key: string): string {
        if (process.env[key] === undefined) {
            throw new Error(`Cannot read environment variable ${key} because it isn't defined.`);
        }
        return process.env[key]!!;
    }

    /**
     * Reads the value of the cookie "access_token" and decode it.
     *
     * @throws RangeError when the cookie value is not a valid JWT token.
     * @throws Error when the token wasn't saved.
     */
    private static decodeSavedAccessToken(): JsonWebToken {
        const token: string | undefined = Cookie.read(this.accessTokenCookieKey);
        if (token) {
            return JsonWebTokenUtils.requireValid(token);
        } else {
            throw new Error("Could not decode the access token because it wasn't saved.");
        }
    }

}