import React, { useState } from "react";
import { Container, createStyles, makeStyles, Theme, Fab } from "@material-ui/core";
import { Ride } from "../../types";
import { TrafficCondition } from "./fields";

import AddIcon from '@material-ui/icons/Add';
import RideList from "./list/RideList";
import RideForm from "./form/RideForm";


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

/**
 * The component acts as the entry point of the rides entry. It allows a user
 * to visualize rides, add a new ride, edit and consult a specific ride.
 */
function Rides() {

    const classes = useStyles();

    const [showList, setShowList] = useState<boolean>(true);
    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <Container>
            {
                showList && <div>
                    <RideList rides={rides} />
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.fab}
                        onClick={() => {
                            // TODO: show ride form (the current ride should be found in the state)
                            setShowList(false);
                            setShowForm(true);
                            console.log("Add ride action clicked");
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </div>
            }
            {
                showForm && <div>
                    <RideForm
                        ride={model}
                        isDriving={false}
                        onChange={(ride: Ride) => { }}
                        onSubmit={(ride: Ride) => { }}
                    />
                </div>
            }
        </Container>
    );
}

export default Rides;