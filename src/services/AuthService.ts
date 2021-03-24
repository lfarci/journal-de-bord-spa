import { Log, User, UserManager, WebStorageStateStore } from 'oidc-client';
import { Environment } from "./Environment";

/**
 * This class acts as a wrapper around this UserManager class of the
 * oicd-client-js package. The package objective is to add support for the
 * OpenID Connect protocol in this client.
 *
 * You can read about this class in the package wiki here:
 * https://github.com/IdentityModel/oidc-client-js/wiki
 */
export class AuthService {

	public _userManager: UserManager;

	constructor() {
		this._userManager = new UserManager({
			authority: Environment.authority,
			client_id: Environment.clientId,
			redirect_uri: `${window.location.origin}/login/callback`,
			silent_redirect_uri: `${window.location.origin}/silent/callback`,
			post_logout_redirect_uri: `${window.location.origin}/`,
			response_type: 'code',
			scope: 'openid write read',
			response_mode: 'query',
			userStore: new WebStorageStateStore({ store: window.sessionStorage }),
			automaticSilentRenew: true
		});

		Log.logger = console;
		Log.level = Log.INFO;
	}

	private set authorizationEndpoint(uri: string) {
		this._userManager.settings.metadata = { authorization_endpoint: uri };
	}

	public isLoggedIn(): boolean {
		const item: string | null = sessionStorage.getItem(`oidc.user:${Environment.authority}:${Environment.clientId}`);
		if (item) {
			return JSON.parse(item).access_token !== undefined;
		}
		return false;
	}

	public getUserGivenName(): string {
		const item: string | null = sessionStorage.getItem(`oidc.user:${Environment.authority}:${Environment.clientId}`);
		if (item && JSON.parse(item).profile.given_name) {
			return JSON.parse(item).profile.given_name;
		}
		return "unknown";
	}

	public getUser(): Promise<User | null> {
		return this._userManager.getUser();
	}

	public login(): Promise<void> {
		this.authorizationEndpoint = Environment.authServerLoginUri;
		return this._userManager.signinRedirect();
	}

	public register(): Promise<void> {
		this.authorizationEndpoint = Environment.authServerRegisterUri;
		return this._userManager.signinRedirect();
	}

	public renewToken(): Promise<User> {
		return this._userManager.signinSilent();
	}

	public logout(): Promise<void> {
		return this._userManager.signoutRedirect();
	}

}