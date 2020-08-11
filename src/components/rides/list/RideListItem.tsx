import React from "react";

import { TrafficCondition } from "../fields";
import { Card, Typography, CardContent, Grid, Chip, createStyles, makeStyles, Theme } from "@material-ui/core";

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
    className: string;
    departureLocationName: string;
    arrivalLocationName: string;
    date: Date;
    trafficCondition: TrafficCondition;
    distance: number;
    duration: number;
}

function RideListItem(props: IRideListItem) {
    const classes = useStyles();
    return (
        <Card className={props.className}>
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
        </Card>
    );
}

export default RideListItem;