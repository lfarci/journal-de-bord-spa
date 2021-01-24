import React, { useEffect, useState } from "react";
import { Page } from "../../common";

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

import "./Profile.scss";

import { Property, Section } from "../../common";
import ProfileHeader from "./ProfileHeader";
import { AuthService } from "../../../services/AuthService";
import { User } from "oidc-client";
import { ResourcesService } from "../../../services/ResourcesService";
import { ObjectiveFormDialog, ConfirmationDialog, ExportFormDialog } from "./dialogs";

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
	/**
	 * This is the URI to the picture of the current user.
	 */
	imageUri: string | null;
	isLoading: boolean;
	error: Error | undefined;
	showObjectiveFormDialog: boolean;
	showDeleteDialog: boolean;
	showFormatDialog: boolean;
}

function Profile() {

	const defaultValue = "Unknown"

	const [state, setState] = useState<IProfileState>({
		username: null,
		email: null,
		objective: null,
		imageUri: null,
		isLoading: true,
		error: undefined,
		showObjectiveFormDialog: false,
		showDeleteDialog: false,
		showFormatDialog: false
	});

	const getUsername = () => state.username == null ? defaultValue : state.username;
	const getEmail = () => state.email == null ? defaultValue : state.email;

	const showObjectiveFormDialog = (value: boolean) => {
		setState((prev) => ({ ...prev, showObjectiveFormDialog: value }));
	};
	const showFormatFormDialog  = () => setState((prev) => ({ ...prev, showFormatDialog: true }));

	useEffect(() => {
		const authService = new AuthService();
		const resources = new ResourcesService();
		const getUser = async () => {
			const user: User | null = await authService.getUser();
			if (user) {
				const objective: number = await resources.getObjective(user?.profile.sub);
				const imageUri: string = await resources.getImageUri(user?.profile.sub);
				setState((prev) => ({
					...prev,
					isLoading: false,
					username: user?.profile.name,
					email: user?.profile.preferred_username,
					objective: objective,
					imageUri: imageUri
				}));
			}
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
		<ProfileHeader name={getUsername()} picture={state.imageUri!!} />
		<Section title="General" divider>
			<Property
				label="Email"
				value={getEmail()}
			/>
			<Property
				label="Distance objective"
				value={`${state.objective} kilometers`}
				onClick={() => showObjectiveFormDialog(true)}
				renderIcon={() => <EditRoundedIcon style={{ color: "c4c4c4" }}/>}
			/>
		</Section>
		<Section title="Data" divider>
			<Property
				label="Export my journal"
				renderIcon={() => <GetAppRoundedIcon style={{ color: "c4c4c4" }} />}
				onClick={() => showFormatFormDialog() }
			/>
			<Property
				label="Delete my journal"
				renderIcon={() => <DeleteRoundedIcon style={{ color: "c4c4c4" }} />}
				onClick={() => setState((prev) => ({ ...prev, showDeleteDialog: true }))}
			/>
		</Section>
		<Section>
			<Property
				label="Log out"
				onClick={() => new AuthService().logout()}
				renderIcon={() => <ExitToAppRoundedIcon style={{ color: "c4c4c4" }} />}
			/>
		</Section>
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
		<ExportFormDialog
			open={state.showFormatDialog}
			onCancel={() => setState((prev) => ({ ...prev, showFormatDialog: false }))}
			onSubmit={(format: string) => {
				console.log(`Export to ${format} selected.`);
				setState((prev) => ({ ...prev, showFormatDialog: false }));
			}}
		/>
	</Page>
}

export default Profile;