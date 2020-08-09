import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import RideForm from './components/ride/RideForm';
import { Box, BottomNavigation, BottomNavigationAction, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ApplicationBar from './components/navigation/ApplicationBar';
import { Ride } from './types/Ride';
import { TrafficCondition } from './components/ride/fields';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }),
);

/**
 * Starts a new ride.
 *
 * @param ride is the new ride.
 */
function startANewRide(ride: Ride) {
  console.log("[DEBUG] Starting a new ride.");
}

/**
 * Should call the backend and finish the last started ride.
 *
 * @param ride is the ride that is finished.
 */
function finishLastRide(ride: Ride) {
  console.log("[DEBUG] Finishing the last ride");
}

// temporary this is mocking fetching from the api
const model: Ride = {
  departure: {
    moment: new Date(),
    location: {
      id: 3,
      name: "Magasin",
      latitude: 23.45,
      longitude: 23.45
    },
    odometerValue: 10000
  },
  arrival: {
    moment: new Date(),
    location: {
      id: 4,
      name: "Maison",
      latitude: 25,
      longitude: 26
    },
    odometerValue: 12000
  },
  driverPseudonym: undefined,
  trafficCondition: TrafficCondition.NORMAL,
  comment: "Je suis un brave."
};

function App() {

  const classes = useStyles();

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [driving, setDriving] = useState(true);

  // get last ride from API

  return (
    <Box className={classes.root}>
      <ApplicationBar
        title="Ride"
        onMenuClicked={() => setShowDrawer(true)}
      />
      <Drawer anchor="left" open={showDrawer} onClose={() => setShowDrawer(false)} defaultValue="rides">
        <List>
            <ListItem button
              key="rides"
              selected={0 == selectedIndex}
              onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                console.log("Rides clicked");
                setSelectedIndex(0);
              }}
            >
              <ListItemIcon>{ <DriveEtaIcon /> }</ListItemIcon>
              <ListItemText primary="Rides" />
            </ListItem>
            <ListItem button
              key="locations"
              selected={1 == selectedIndex}
              onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                console.log("Locations clicked");
                setSelectedIndex(1);
              }}
            >
              <ListItemIcon>{ <LocationOnIcon /> }</ListItemIcon>
              <ListItemText primary="Locations" />
            </ListItem>
            <ListItem button
              key="statistics"
              selected={2 == selectedIndex}
              onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                console.log("Statistics clicked");
                setSelectedIndex(2);
              }}
            >
              <ListItemIcon>{ <EqualizerIcon /> }</ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItem>
        </List>
      </Drawer>
      <RideForm
        ride={model}
        isDriving={driving}
        onChange={(ride: Ride) => {}}
        onSubmit={(ride: Ride) => {
          if (driving) {
            finishLastRide(ride);
            setDriving(false);
          } else {
            startANewRide(ride);
            setDriving(true);
          }
          console.log(JSON.stringify(ride, null, 2));
        }}
      />
    </Box>
  );
}

export default App;