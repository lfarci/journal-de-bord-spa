import React, { useEffect, useState } from "react";
import { Page } from "../../common";

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

import "./Profile.scss";

import ProfileProperty from "./ProfileProperty";
import ProfileSection from "./ProfileSection";
import ProfileHeader from "./ProfileHeader";
import { AuthService } from "../../../services/AuthService";
import { User } from "oidc-client";
import { ResourcesService } from "../../../services/ResourcesService";

interface IProfileState {
	user: User | null;
	objective: number | null;
	isLoading: boolean;
	error: Error | undefined;
}

function Profile() {

	const [state, setState] = useState<IProfileState>({
		user: null,
		objective: null,
		isLoading: true,
		error: undefined
	});

	useEffect(() => {
		const authService = new AuthService();
		const resources = new ResourcesService();
		const getUser = async () => {
			const user: User | null = await authService.getUser();
			const objective: number = await resources.getObjective("userId")
			setState((prev) => ({ ...prev, isLoading: false, user: user, objective: objective }));
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
		<ProfileHeader name={state.user?.profile.name!!} picture="https://scontent.fbru2-1.fna.fbcdn.net/v/t31.0-8/18209356_1613491082024964_6359923658550097249_o.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=HBdEpwICukIAX8u77kv&_nc_ht=scontent.fbru2-1.fna&oh=9c556f735209987b473a1aa44f1226a1&oe=5FAF9C2F" />
		<ProfileSection title="General" divider>
			<ProfileProperty label="Email" value={state.user?.profile.email!!} />
			<ProfileProperty
				label="Distance objective"
				value={`${state.objective} kilometers`}
				renderIcon={() => <EditRoundedIcon style={{ color: "c4c4c4" }}/>}
			/>
		</ProfileSection>
		<ProfileSection title="Data" divider>
			<ProfileProperty label="Export my journal" renderIcon={() => <GetAppRoundedIcon style={{ color: "c4c4c4" }} />} />
			<ProfileProperty label="Delete my journal" renderIcon={() => <DeleteRoundedIcon style={{ color: "c4c4c4" }} />} />
		</ProfileSection>
		<ProfileSection>
			<ProfileProperty label="Log out" />
		</ProfileSection>
	</Page>
}

export default Profile;