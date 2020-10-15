import React from "react";
import { Page } from "../../common";

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

import "./Profile.scss";

import ProfileProperty from "./ProfileProperty";
import ProfileSection from "./ProfileSection";
import ProfileHeader from "./ProfileHeader";

function Profile() {
    return <Page title="Profile" showBackButton>
        <ProfileHeader />
        <ProfileSection title="General" divider>
            <ProfileProperty label="Email" value="farci.logan@gmail.com" />
            <ProfileProperty label="Distance objective" value="1500 kilometers" renderIcon={() => <EditRoundedIcon style={{ color: "c4c4c4" }}/>} />
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