import React from "react";

import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EqualizerIcon from '@material-ui/icons/Equalizer';

export type NavigationDrawerKey = "home" | "rides" | "locations" | "statistics";

interface INavigationDrawer {
    /**
     * When set to true the navigation drawer is open.
     */
    open: boolean;
    /**
     * Is the key of the selected list item.
     */
    selected: string;
    /**
     * Called when the navigation drawer is closed.
     */
    onClose: () => void;
    /**
     * Called when the navigation drawer is clicked. clickedKey argument is the
     * key of the drawer that has been clicked.
     */
    onClick: (clickedKey: NavigationDrawerKey) => void;
}

/**
 * Item represents an entry of the navigation drawer. You can specify a new
 * entry by specifying a label, an icon (material-ui-icons) and a key.
 */
interface INavigationDrawerEntry {
    /**
     * The key is used to identify a navigation entry and should be unique.
     */
    key: NavigationDrawerKey;
    /**
     * The label is the text shown in the drawer to describe the entry content.
     */
    label: string;
    /**
     * Is a material ui icon object.
     */
    icon: object;
}

const entries: INavigationDrawerEntry[] = [
    {
        key: "home",
        label: "Home",
        icon: <HomeIcon />
    },
    {
        key: "rides",
        label: "Rides",
        icon: <DriveEtaIcon />
    },
    {
        key: "locations",
        label: "Locations",
        icon: <LocationOnIcon />
    },
    {
        key: "statistics",
        label: "Statistics",
        icon:  <EqualizerIcon />
    }
];

function NavigationDrawer(props: INavigationDrawer) {
    return (
        <Drawer anchor="left" open={props.open} onClose={props.onClose}>
            <List>
                {entries.map((item: INavigationDrawerEntry, index: number) => <ListItem button
                    key={item.key}
                    selected={props.selected === item.key}
                    onClick={(e) => props.onClick(item.key)}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                </ListItem>)}
            </List>
        </Drawer>
    );
}

export default NavigationDrawer;