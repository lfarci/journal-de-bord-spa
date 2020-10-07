import React, { useState } from "react";
import { AuthService } from "../../services/AuthService";
import ApplicationBar from "../navigation/ApplicationBar";
import NavigationDrawer, { NavigationDrawerKey } from "../navigation/callbacks/NavigationDrawer";

import "./Page.scss";

interface IPageProps {
	title: string;
	selected?: NavigationDrawerKey;
	children: React.ReactNode;
}

interface IPageState {
	isDrawerOpen: boolean;
	selected: NavigationDrawerKey;
}

function Page(props: IPageProps) {

	const authService = new AuthService();

	const [state, setState] = useState<IPageState>({
		isDrawerOpen: false,
		selected: props.selected ? props.selected : undefined
	});

	const openDrawer = (): void => setState((prev) => ({ ...prev, isDrawerOpen: true }));
	const closeDrawer = (): void => setState((prev) => ({ ...prev, isDrawerOpen: false }));
	const select = (key: NavigationDrawerKey): void => setState((prev) => ({ ...prev, selected: key }));

	return <div className="page-root">
		<ApplicationBar
			className="page-app-bar"
			title={props.title}
			showBackArrow={false}
			onMenuClicked={openDrawer}
			showLogInButton={!authService.isLoggedIn()}
			onLogIn={async () => {await authService.login(); }}
			onLogOut={async () => {await authService.logout(); }}
		/>
		<NavigationDrawer
			open={state.isDrawerOpen}
			selected={state.selected}
			onClose={closeDrawer}
			onClick={select}
		/>
		<div className="page-content">
			{props.children}
		</div>
	</div>
}

export default Page;