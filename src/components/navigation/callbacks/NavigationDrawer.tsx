import React from "react";

import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import { useHistory } from "react-router-dom";
import NavigationDrawerHeader from "../NavigationDrawerHeader";
import { AuthService } from "../../../services/AuthService";

export type NavigationDrawerKey = "home" | "profile" | "rides" | "locations" | "statistics" | undefined;

interface INavigationDrawer {
	/**
	 * When set to true the navigation drawer is open.
	 */
	open: boolean;
	/**
	 * Is the key of the selected list item.
	 */
	selected: NavigationDrawerKey;
	/**
	 * Called when the navigation drawer is closed.
	 */
	onClose: () => void;
	/**
	 * Called when the navigation drawer is clicked. item is the clicked entry.
	 */
	onClick: (item: NavigationDrawerKey) => void;
}

/**
 * Item represents an entry of the navigation drawer. You can specify a new
 * entry by specifying a label, an icon (material-ui-icons) and a key.
 */
export interface INavigationDrawerEntry {
	/**
	 * The key is used to identify a navigation entry and should be unique.
	 */
	key: NavigationDrawerKey;
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

const entries: INavigationDrawerEntry[] = [
	{
		key: "home",
		label: "Home",
		url: "/home",
		icon: <HomeIcon />
	},
	{
		key: "rides",
		label: "Rides",
		url: "/rides",
		icon: <DriveEtaIcon />
	},
	{
		key: "locations",
		label: "Locations",
		url: "/locations",
		icon: <LocationOnIcon />
	},
	{
		key: "statistics",
		label: "Statistics",
		url: "/statistics",
		icon:  <EqualizerIcon />
	},
];

function NavigationDrawer(props: INavigationDrawer) {
	const history = useHistory();
	const authService = new AuthService();
	return (
		<Drawer anchor="left" open={props.open} onClose={props.onClose}>
			{authService.isLoggedIn() && (<div>
				<NavigationDrawerHeader user={{
					familyName: "Default",
					givenName: "Default",
					id: "identified",
					name: "default",
					username: "default",
					pictureUri: "no"
				}}/>
				<Divider />
			</div>)}
			<List>
				{entries.map((item: INavigationDrawerEntry, index: number) => <ListItem button
					key={item.key}
					selected={props.selected === item.key}
					onClick={(e) => {
						history.push(item.url);
						props.onClick(item.key);
						props.onClose();
					}}
				>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText primary={item.label} ></ListItemText>
				</ListItem>)}
			</List>
		</Drawer>
	);
}

export default NavigationDrawer;