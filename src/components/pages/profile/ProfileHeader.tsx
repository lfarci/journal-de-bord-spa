import React from "react";

interface IProfileHeaderProps {
	/**
	 * The URI to the user picture.
	 */
	picture: string;
	/**
	 * The name should be in a "GivenName FamilyName" format.
	 */
	name: string;
}

function ProfileHeader(props: IProfileHeaderProps) {
	return <div className="profile-header-root">
		<img className="profile-header-root-picture" src={props.picture} alt={props.name} />
		<p className="profile-header-title">{props.name}</p>
	</div>;
}

export default ProfileHeader;