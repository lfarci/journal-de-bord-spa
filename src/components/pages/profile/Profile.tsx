import React, { useEffect, useState } from "react";
import { Page } from "../../common";

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

import "./Profile.scss";

import ProfileProperty from "./ProfileProperty";
import ProfileSection from "./ProfileSection";
import ProfileHeader from "./ProfileHeader";
import { AuthService } from "../../../services/AuthService";
import { User } from "oidc-client";
import { ResourcesService } from "../../../services/ResourcesService";
import ObjectiveFormDialog from "./ObjectiveFormDialog";
import ConfirmationDialog from "./ConfirmationDialog";

interface IProfileState {
	/**
	 * Is the name of the current user. For instance, "John Doe".
	 */
	username: string | null | undefined,
	/**
	 * Is the email of the current user. This value can be found in the user
	 * provided by the oidc library (user.profile.preffered_username)
	 */
	email: string | null | undefined;
	/**
	 * Is the number of kilometers that the user wants to reach in its journal.
	 */
	objective: number | null;
	isLoading: boolean;
	error: Error | undefined;
	showObjectiveFormDialog: boolean;
	showDeleteDialog: boolean;
}

function Profile() {

	const defaultValue = "Unknown"

	const [state, setState] = useState<IProfileState>({
		username: null,
		email: null,
		objective: null,
		isLoading: true,
		error: undefined,
		showObjectiveFormDialog: false,
		showDeleteDialog: false
	});

	const getUsername = () => state.username == null ? defaultValue : state.username;
	const getEmail = () => state.email == null ? defaultValue : state.email;

	const showObjectiveFormDialog = (value: boolean) => {
		setState((prev) => ({ ...prev, showObjectiveFormDialog: value }));
	};

	useEffect(() => {
		const authService = new AuthService();
		const resources = new ResourcesService();
		const getUser = async () => {
			const user: User | null = await authService.getUser();
			const objective: number = await resources.getObjective("userId")
			setState((prev) => ({
				...prev,
				isLoading: false,
				username: user?.profile.name,
				email: user?.profile.preferred_username,
				objective: objective
			}));
		};
		try {
			if (authService.isLoggedIn()) {
				getUser();
			}
		} catch (error) {
			setState((prev) => ({ ...prev, isLoading: false, error: error }));
		}
	}, []);

	return <Page title="Profile" isLoading={state.isLoading} error={state.error} showBackButton>
		<ProfileHeader name={getUsername()} picture="https://shorturl.at/kmyFS" />
		<ProfileSection title="General" divider>
			<ProfileProperty
				label="Email"
				value={getEmail()}
			/>
			<ProfileProperty
				label="Distance objective"
				value={`${state.objective} kilometers`}
				onClick={() => showObjectiveFormDialog(true)}
				renderIcon={() => <EditRoundedIcon style={{ color: "c4c4c4" }}/>}
			/>
		</ProfileSection>
		<ProfileSection title="Data" divider>
			<ProfileProperty
				label="Export my journal"
				renderIcon={() => <GetAppRoundedIcon style={{ color: "c4c4c4" }} />}
			/>
			<ProfileProperty
				label="Delete my journal"
				renderIcon={() => <DeleteRoundedIcon style={{ color: "c4c4c4" }} />}
				onClick={() => setState((prev) => ({ ...prev, showDeleteDialog: true }))}
			/>
		</ProfileSection>
		<ProfileSection>
			<ProfileProperty
				label="Log out"
				onClick={() => new AuthService().logout()}
				renderIcon={() => <ExitToAppRoundedIcon style={{ color: "c4c4c4" }} />}
			/>
		</ProfileSection>
		<ObjectiveFormDialog
			open={state.showObjectiveFormDialog}
			value={state.objective!!}
			onCancel={() => showObjectiveFormDialog(false)}
			onSubmit={(value: number) => {
				console.log(`Submitted objective: ${value}`)
				// TODO: the objective value should be sent to the backend
				setState((prev) => ({
					...prev,
					objective:value,
					showObjectiveFormDialog: false
				}));
			}}
		/>
		<ConfirmationDialog
			open={state.showDeleteDialog}
			onCancel={() => setState((prev) => ({ ...prev, showDeleteDialog: false }))}
			onConfirm={async () => {
				const resources = new ResourcesService();
				setState((prev) => ({ ...prev, isLoading: true }))
				try {
					await resources.deleteJournal("userId");
				} catch (error) {
					setState((prev) => ({ ...prev, isLoading: false, error: error, showDeleteDialog: false}))
				}
				setState((prev) => ({ ...prev, isLoading: false, showDeleteDialog: false }))
			}}
		/>
	</Page>
}

export default Profile;