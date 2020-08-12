import React from "react";

import { TrafficCondition } from "../fields";
import { Card, Typography, CardContent, Grid, Chip, createStyles, makeStyles, Theme, Button, CardActions } from "@material-ui/core";

import SpeedRoundedIcon from '@material-ui/icons/SpeedRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';

const humanizeDuration = require("humanize-duration");

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chips: {
            marginTop: 5
        },
        chip: {
            marginRight: 5
        }
    }),
);

interface IRideListItem {
    /**
     * Is the list item class name. They are set on the root element.
     */
    className: string;
    /**
     * Is the departure location name of the ride.
     */
    departureLocationName: string;
    /**
     * Is the arrival location name of the ride.
     */
    arrivalLocationName: string;
    /**
     * Is the date to show for the represented ride.
     */
    date: Date;
    /**
     * Is the ride traffic condition.
     */
    trafficCondition: TrafficCondition;
    /**
     * Is the distance of the ride in kilometers.
     */
    distance: number;
    /**
     * Is the duration of the ride in milliseconds.
     */
    duration: number;
    /**
     * Called when the details button is clicked.
     */
    onDetails: () => void;
    /**
     * Called when the delete button is clicked.
     */
    onDelete: () => void;
}

function RideListItem(props: IRideListItem) {
    const classes = useStyles();
    return (
        <Card className={props.className} elevation={12}>
            <CardContent>
                <Grid
                    container
                    justify="flex-start"
                    direction="column"
                >
                    <Grid item>
                        <Typography variant="h6">{props.departureLocationName} - {props.arrivalLocationName}</Typography>
                        <Typography variant="caption">{props.date.toLocaleDateString()}</Typography>
                    </Grid>
                    <Grid container
                        direction="row"
                        justify="flex-start"
                        className={classes.chips}
                    >
                        <Grid item>
                            <Chip
                                icon={<SpeedRoundedIcon />}
                                label={props.distance + " km"}
                                color="default"
                                className={classes.chip}
                                size="small"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <Chip
                                icon={<AccessTimeRoundedIcon />}
                                label={humanizeDuration(props.duration)}
                                color="default"
                                className={classes.chip}
                                size="small"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item>
                            <Chip
                                icon={<DriveEtaRoundedIcon />}
                                label={TrafficCondition[props.trafficCondition]}
                                color="default"
                                className={classes.chip}
                                size="small"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={props.onDetails}>Details</Button>
                <Button size="small" color="primary" onClick={props.onDelete}>Remove</Button>
            </CardActions>
        </Card>
    );
}

export default RideListItem;