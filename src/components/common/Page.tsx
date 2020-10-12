import { LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { AuthService } from "../../services/AuthService";
import ApplicationBar from "../navigation/ApplicationBar";
import NavigationDrawer, { NavigationDrawerKey } from "../navigation/callbacks/NavigationDrawer";
import ErrorMessage from "./ErrorMessage";

import "./Page.scss";

interface IPageProps {
	/**
	 * It the title shown in the application bar. It should describe the
	 * current page content. The title is also used in the document title.
	 */
	title: string;
	/**
	 * Is the entry that is currently selected in the navigation drawer.
	 */
	selected?: NavigationDrawerKey;
	/**
	 * Are the page children elements. They are rendered only if the page has
	 * no specified error or isn't loading.
	 */
	children: React.ReactNode;
	/**
	 * When specified the given error is shown in the pageg content.
	 */
	error?: Error;
	/**
	 * When specified and set to true the page shows a progress indicator.
	 */
	isLoading?: boolean;
}

interface IPageState {
	isDrawerOpen: boolean;
	selected: NavigationDrawerKey;
}

function Page(props: IPageProps) {

	const authService = new AuthService();

	const [state, setState] = useState<IPageState>({
		isDrawerOpen: false,
		selected: props.selected ? props.selected : undefined,
	});

	const openDrawer = (): void => setState((prev) => ({ ...prev, isDrawerOpen: true }));
	const closeDrawer = (): void => setState((prev) => ({ ...prev, isDrawerOpen: false }));
	const select = (key: NavigationDrawerKey): void => setState((prev) => ({ ...prev, selected: key }));
	const isLoading = (): boolean => props.isLoading === undefined ? false : props.isLoading;
	const hasError = (): boolean => props.error !== undefined;
	const isReady = (): boolean => !hasError() && !isLoading();

	useEffect(() => {
		document.title = `Journal de bord - ${props.title.toLowerCase()}`;
	});

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
			{ isLoading() && <LinearProgress /> }
			{ isReady() && props.children }
			{ hasError() && <ErrorMessage
				title={props.error!!.name}
				message={props.error!!.message}/>
			}
		</div>
	</div>
}

export default Page;