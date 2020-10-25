import React, { useState } from "react";

import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import RestoreRoundedIcon from '@material-ui/icons/RestoreRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';

import "./ApplicationBottomNavigation.scss";
import { useHistory } from "react-router-dom";

export type ContentKey = "home" | "history" | "statistics" | undefined;

interface IApplicationBottomNavigationProps {
	contentKey: ContentKey;
	onClick: (key: ContentKey) => void;
}

interface IBottomNavigationEntry {
	/**
	 * The key is used to identify a navigation entry and should be unique.
	 */
	key: ContentKey;
	/**
	 * The label is the text shown in the drawer to describe the entry content.
	 */
	label: string;
	/**
	 * Path to the component.
	 */
	url: string;
	/**
	 * Is a material ui icon object.
	 */
	icon: object;
}

const entries: IBottomNavigationEntry[] = [
	{
		key: "home",
		label: "Home",
		url: "/home",
		icon: <HomeRoundedIcon />
	},
	{
		key: "history",
		label: "History",
		url: "/rides",
		icon: <RestoreRoundedIcon />
	},
	{
		key: "statistics",
		label: "Statistics",
		url: "/statistics",
		icon: <EqualizerRoundedIcon />
	},
];

function ApplicationBottomNavigation(props: IApplicationBottomNavigationProps) {

	const history = useHistory();

	const [value, setValue] = useState<ContentKey>(props.contentKey);

	const getPathname = (key: ContentKey): string => {
		const entry = entries.find(entry => entry.key === key);
		return entry === undefined ? "/home" : entry.url;
	}

	return <BottomNavigation
		value={value}
		onChange={(_, key: ContentKey) => {
			setValue(key);
			props.onClick(key);
			history.push(getPathname(key));
		}}
		className="application-bottom-navigation"
		showLabels
	>
		{
			entries.map(entry => <BottomNavigationAction
				key={entry.key}
				value={entry.key}
				label={entry.label}
				icon={entry.icon}
			/>)
		}
	</BottomNavigation>
}

export default ApplicationBottomNavigation;