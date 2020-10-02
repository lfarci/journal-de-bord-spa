import React from "react";
import { Application } from "../../services/Application";
import { Box, Button, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 10,
			padding: 10,
		},
		button: {
			margin: 10
		}
	}),
);

function Landing() {

	const classes = useStyles();

	return <Box
			className={classes.root}
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			height="100%"
		>
		<Typography variant="h4" align="center">
			Welcome to the <i>Journal de Bord</i> project.
		</Typography>
		<Typography variant="subtitle1" align="center">
			Create your learner driver journal and keep track of your first rides. Register now and start tracking!
		</Typography>
		<Box
			display="flex"
			flexDirection="row"
			justifyContent="center"
		>
			<Button
				className={classes.button}
				variant="contained"
				color="primary"
				onClick={() => { Application.register() }}>
				Register now
			</Button>
		</Box>
	</Box>;
}

export default Landing;