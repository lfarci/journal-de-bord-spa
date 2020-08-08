import React, { useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import RideForm from './components/ride/RideForm';
import { Box } from '@material-ui/core';
import ApplicationBar from './components/navigation/ApplicationBar';
import { Ride } from './types/Ride';
import { TrafficCondition } from './components/ride/fields';

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
    },
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
  const [driving, setDriving] = useState(true);
  // get last ride from API
  return (
    <Box className={classes.root}>
      <ApplicationBar title="Ride" />
      <RideForm
        ride={model}
        isDriving={driving}
        onChange={(ride: Ride) => {
          console.log(JSON.stringify(ride, null, 2));
        }}
        onSubmit={(ride: Ride) => {
          console.log("[DEBUG] Submitted ride.");
          if (driving) {
            finishLastRide(ride);
            setDriving(false);
          } else {
            startANewRide(ride);
            setDriving(true);
          }
        }}
      />
    </Box>
  );
}

export default App;