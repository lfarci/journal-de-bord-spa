import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Home from './components/home/Home';
import ApplicationBar from './components/navigation/ApplicationBar';
import NavigationDrawer, { NavigationDrawerKey } from './components/navigation/NavigationDrawer';
import Rides from './components/rides/list/Rides';

import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import RideForm from './components/rides/form/RideForm';
import { Ride } from './types';
import { TrafficCondition } from './components/rides/form/fields';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: -10,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }),
);

function App() {

  const classes = useStyles();
  const history = useHistory();

  const [title, setTitle] = useState<string>("Rides");
  const [isBackArrowShown, setShowBackArrow] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selected] = useState<NavigationDrawerKey>("rides");

  return (
    <Box className={classes.root}>
      <ApplicationBar
        title={title}
        showBackArrow={isBackArrowShown}
        onMenuClicked={() => {
          if (isBackArrowShown) {
            // setScreenContent("list");
            history.goBack();
            setShowBackArrow(false)
          } else {
            setShowDrawer(true);
          }
        }}
      />
      <NavigationDrawer
        open={showDrawer}
        selected={selected}
        onClose={() => setShowDrawer(false)}
        onClick={(title: string) => setTitle(title)}
      />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/rides"><Rides onAddActionClicked={() => setShowBackArrow(true) }/>
        </Route>
        <Route exact path="/rides/form">
          <RideForm
            ride={model}
            isDriving={false}
            onChange={() => { }}
            onSubmit={() => { }}
          />
        </Route>
        <Route path="/locations"><p>Locations</p></Route>
        <Route path="/statistics"><p>Statistics</p></Route>
      </Switch>
    </Box>
  );
}

export default App;