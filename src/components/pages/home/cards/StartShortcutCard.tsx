import React from "react";
import { Card, CardContent, Typography, CardActions, Button, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 10,
		}
	})
);

function StartShortcutCard(props: {}) {
    const classes = useStyles();
    return <>
        <Card className={classes.root} elevation={12}>
            <CardContent>
                <Typography variant="h6">Hi Logan,</Typography>
                <Typography variant="body1">Start tracking your ride and let us know how well you did when you are done.</Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" color="primary">Start a new ride</Button>
            </CardActions>
        </Card>
    </>;
}

export default StartShortcutCard;