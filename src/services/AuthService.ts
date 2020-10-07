import { Log, User, UserManager, WebStorageStateStore } from 'oidc-client';
import { Environment } from "./Environment";

export class AuthService {

	public _userManager: UserManager;
	private _user: User | null;

	constructor() {
		const settings = {
			authority: Environment.authority,
			client_id: Environment.clientId,
			redirect_uri: `${window.location.origin}/login/callback`,
			silent_redirect_uri: `${window.location.origin}/silent-renew.html`,
			post_logout_redirect_uri: `${window.location.origin}/`,
			response_type: 'code',
			scope: 'openid write read',
			response_mode: 'query',
			userStore: new WebStorageStateStore({ store: window.sessionStorage }),
			automaticSilentRenew: true
		};

		this._userManager = new UserManager(settings);
		this._user = null;

		this._userManager.getUser().then(user =>{
			if(user && !user.expired){
			  this._user = user;
			}
		});

		Log.logger = console;
		Log.level = Log.INFO;
	}

	public isLoggedIn(): boolean {
		const item: string | null = sessionStorage.getItem(`oidc.user:${Environment.authority}:${Environment.clientId}`);
		if (item) {
			return JSON.parse(item).access_token !== undefined;
		}
		return false;
	}

	public getUser(): Promise<User | null> {
		return this._userManager.getUser();
	}

	public login(): Promise<void> {
		return this._userManager.signinRedirect();
	}

	public renewToken(): Promise<User> {
		return this._userManager.signinSilent();
	}

	public logout(): Promise<void> {
		return this._userManager.signoutRedirect();
	}

}