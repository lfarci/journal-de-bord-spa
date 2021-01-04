import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { LocationField, OdometerField } from '../../rides/form/fields';

import { Location } from '../../../../types';

interface IObjectiveFormDialogProps {
	open: boolean;
	onSubmit: (value: string) => void;
	onCancel: () => void;
}

function StartRideDialog(props: IObjectiveFormDialogProps) {

    const fetchLocations = (): Location[] => {
		return [
			{ id: 0, name: "Home", latitude: 34.34, longitude: 23.23 },
			{ id: 1, name: "Workplace", latitude: 34.34, longitude: 23.23 },
			{ id: 2, name: "Store", latitude: 34.34, longitude: 23.23 },
			{ id: 3, name: "Library", latitude: 34.34, longitude: 23.23 },
		];
	}

	return <Dialog open={props.open} onClose={props.onCancel} aria-labelledby="form-dialog-title">
		<DialogTitle id="form-dialog-title">Starting a new ride</DialogTitle>
		<DialogContent>
			<DialogContentText>
				You are about to start tracking a new ride. Before you start, please
                provide the following information.
			</DialogContentText>
            <LocationField
				id="home-start-location"
				label="Location"
				placeholder="e.g. Home"
				hint="Enter your current location name"
				options={fetchLocations()}
				value={fetchLocations()[0]}
				onChange={(value: Location) => {}}
			/>
            <OdometerField
                id="home-start-odometer"
                label="Odometer value"
                placeholder="e.g. 454543"
				hint="This will be used to compute the ride distance."
                value={12}
                onChange={(value: number) => {}}
            />
		</DialogContent>
		<DialogActions>
			<Button onClick={() => props.onCancel()} color="primary">Cancel</Button>
			<Button onClick={() => props.onSubmit("")} color="primary">Start tracking</Button>
		</DialogActions>
	</Dialog>;
}

export default StartRideDialog;