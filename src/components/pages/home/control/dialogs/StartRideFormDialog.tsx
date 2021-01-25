import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Location, Stop} from "../../../../../types";
import { Button, DialogContentText } from '@material-ui/core';
import StopForm from '../../../rides/form/StopForm';

interface IStartRideFormDialogProps {
	open: boolean;
	onSubmit: (value: Stop) => void;
	onCancel: () => void;
}

interface ObjectiveFormDialogState {
	location: Location;
	odometer: number;
}

function StartRideFormDialog(props: IStartRideFormDialogProps) {

	const [stop, setStop] = useState<Stop>({
		moment: new Date(),
		location: {
			name: "Home",
			latitude: 0.0,
			longitude: 0.0
		},
		odometerValue: 0
	});

	return <Dialog open={props.open} onClose={props.onCancel} aria-labelledby="form-dialog-title">
		<DialogTitle id="form-dialog-title">Starting a new ride</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Fill the form and click save to start tracking your ride.
			</DialogContentText>
			<StopForm onChange={setStop} />
		</DialogContent>
		<DialogActions>
			<Button onClick={() => props.onCancel()} color="primary">Cancel</Button>
			<Button onClick={() => props.onSubmit(stop)} color="primary">Start</Button>
		</DialogActions>
	</Dialog>;
}

export default StartRideFormDialog;