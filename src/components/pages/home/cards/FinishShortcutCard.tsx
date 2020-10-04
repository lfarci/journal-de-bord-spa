import React from "react";
import { Card, CardContent, Typography, CardActions, Button, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 10,
		}
	})
);

function FinishShortcutCard(props: {}) {
    const classes = useStyles();
    return <>
        <Card className={classes.root} elevation={12}>
            <CardContent>
                <Typography variant="h6">Welcome back Logan,</Typography>
                <Typography variant="body1">Finish your ride and let us know how well you did!</Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" color="primary">Finish my ride</Button>
                <Button size="medium" color="primary">Cancel</Button>
            </CardActions>
        </Card>
    </>;
}

export default FinishShortcutCard;