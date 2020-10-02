import { JsonWebToken } from "../types";

export class JsonWebTokenUtils {

    private static jwtRegExp: RegExp = new RegExp("^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$");

    /**
     * Tells if the given string is a valid JSON web token (JWT).
     *
     * @param token is the string that represents a valid JWT.
     */
    public static isValid(token: string): boolean {
        return this.jwtRegExp.test(token);
    }

    /**
     * Makes sure that the given string is a JWT. if the string is a valid
     * token then it is decoded and returneed. Otherwise, an error is thrown.
     *
     * @param token is the string that represents a valid JWT.
     * @throws RangeError when the given string does not represent a valid
     * token.
     */
    public static requireValid(token: string): JsonWebToken {
        if (JsonWebTokenUtils.isValid(token)) {
            return JsonWebTokenUtils.decodeJsonWebToken(token);
        } else {
            throw new RangeError(`Invalid JWT string: ${token}`);
        }
    }

    /**
     * Decodes a string that represents a JWT token.
     *
     * @param token is the string that represents a valid JWT.
     * @throws RangeError when the given string does not represent a valid
     * token.
     */
    public static decodeJsonWebToken(token: string): JsonWebToken {
        if (!this.isValid(token)) {
            throw new RangeError(`Cannot decode the token because it is invalid: ${token}`);
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

}