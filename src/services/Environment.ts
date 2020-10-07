export class Environment {

    private static variableNamePrefix = "REACT_APP_";

    public static authority: string = Environment.getVariable("AUTH_SERVER_URI");
    public static clientId: string = Environment.getVariable("CLIENT_ID");
    public  static clientSecret: string = Environment.getVariable("CLIENT_SECRET");
    public static authServerTokenUri: string = Environment.getVariable("AUTH_SERVER_TOKEN_URI");
    public static authServerLoginUri: string = Environment.getVariable("AUTH_SERVER_LOGIN_URI");
    public static authServerRegisterUri: string = Environment.getVariable("AUTH_SERVER_REGISTER_URI");
    public static redirectUri: string = Environment.getVariable("REDIRECT_URI");

	private static getVariable(key: string): string {
        const variableName: string = `${this.variableNamePrefix}${key}`;
        if (process.env[variableName] === undefined) {
            throw new Error(`Cannot read environment variable ${variableName} because it isn't defined.`);
        }
        return process.env[variableName]!!;
    }

}