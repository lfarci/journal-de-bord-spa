import React, { useState } from "react";
import { Typography, Container, createStyles, makeStyles, Theme, Fab } from "@material-ui/core";
import RideListItem from "./list/RideListItem";
import { Ride } from "../../types";
import { TrafficCondition } from "./fields";

import AddIcon from '@material-ui/icons/Add';

const moment = require("moment");

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 10,
            overflow: "auto"
        },
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    })
);

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

const rides: Ride[] = [0, 1, 2, 3, 4, 5, 6].map(e => {
    model.id = e;
    return { ...model };
});

function Rides(props: {}) {

    const classes = useStyles();

    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <Container>
            {
                rides.map((ride: Ride) => <RideListItem
                    className={classes.root}
                    ride={ride}
                    onDelete={() => {
                        // TODO: Show confirmation dialog
                        console.log(`[DELETE] Ride { id: ${ride.id} }`)
                        if (window.confirm("Do you really want to delete this ride?")) {
                            // TODO: request deletion to the backend
                            console.log("[DELETE] Deletion has been confirmed.");
                        } else {
                            console.log("[DELETE] Deletion has been canceled.");
                        }
                    }}
                    onDetails={() => {
                        // TODO: request details to the backend
                        // TODO: show ride details page
                        console.log(`[DETAILS] Ride { id: ${ride.id} }`)
                    }}
                />)
            }
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={() => {
                    // TODO: show ride form
                    console.log("Add ride action clicked");
                }}
            >
                <AddIcon />
            </Fab>
        </Container>
    );
}

export default Rides;