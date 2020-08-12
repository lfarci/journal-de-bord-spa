import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Home from './components/home/Home';
import ApplicationBar from './components/navigation/ApplicationBar';
import NavigationDrawer, { NavigationDrawerKey } from './components/navigation/NavigationDrawer';
import Rides from './components/rides/Rides';

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

  const [title, setTitle] = useState<string>("Rides");
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selected, setSelected] = useState<NavigationDrawerKey>("rides");

  return (
    <Box className={classes.root}>
      <ApplicationBar
        title={title}
        onMenuClicked={() => setShowDrawer(true)}
      />
      <NavigationDrawer
        open={showDrawer}
        selected={selected}
        onClose={() => setShowDrawer(false)}
        onClick={(selectedKey: NavigationDrawerKey) => {
          setSelected(selectedKey);
          setShowDrawer(false);
          switch (selectedKey) {
            case "home":
              setTitle("Home");
              break;
            case "rides":
              setTitle("Rides");
              break;
            case "locations":
              setTitle("Locations");
              break;
            default:
              setTitle("Statistics");
          }
        }}
      />
      {selected === "home" && <Home />}
      {selected === "rides" && <Rides />}
      {selected === "locations" && <p>Locations</p>}
      {selected === "statistics" && <p>Statistics</p>}
    </Box>
  );
}

export default App;