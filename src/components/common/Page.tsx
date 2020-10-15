import { LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { AuthService } from "../../services/AuthService";
import ApplicationBar from "../navigation/ApplicationBar";
import ApplicationBottomNavigation, { ContentKey } from "../navigation/ApplicationBottomNavigation";
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
	selected?: ContentKey;
	/**
	 * When specified the page shows a back button in the application bar.
	 */
	showBackButton?: boolean;
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
	content: ContentKey;
}

function Page(props: IPageProps) {

	const authService = new AuthService();

	const [state, setState] = useState<IPageState>({
		content: props.selected ? props.selected : undefined
	});

	const isLoading = (): boolean => props.isLoading === undefined ? false : props.isLoading;
	const hasError = (): boolean => props.error !== undefined;
	const isReady = (): boolean => !hasError() && !isLoading();

	const setContent = (key: ContentKey): void => setState((prev) => ({ ...prev, content: key }));

	useEffect(() => {
		document.title = `Journal de bord - ${props.title.toLowerCase()}`;
	});

	return <div className="page-root">
		<ApplicationBar
			className="page-app-bar"
			title={props.title}
			onLogIn={async () => {await authService.login(); }}
			onLogOut={async () => {await authService.logout(); }}
			showBackButton={props.showBackButton}
		/>
		<div className="page-content">
			{ isLoading() && <LinearProgress /> }
			{ isReady() && props.children }
			{ hasError() && <ErrorMessage
				title={props.error!!.name}
				message={props.error!!.message}/>
			}
		</div>
		{authService.isLoggedIn() && <ApplicationBottomNavigation contentKey={state.content} onClick={setContent} />}
	</div>
}

export default Page;