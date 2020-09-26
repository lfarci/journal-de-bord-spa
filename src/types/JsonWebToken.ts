export type JsonWebToken = {
    exp: number,
    iat: number,
    auth_time: number,
    jti: string,
    iss: string,
    sub: string,
    typ: string,
    azp: string,
    session_state: string,
    acr: string,
    scope: string,
    name: string,
    preferred_username: string,
    given_name: string,
    family_name: string
}