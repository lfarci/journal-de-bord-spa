import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IObjectiveFormDialogProps {
	open: boolean;
	onSubmit: (value: number) => void;
	onCancel: () => void;
}

export default function ObjectiveFormDialog(props: IObjectiveFormDialogProps) {
	return <Dialog open={props.open} onClose={props.onCancel} aria-labelledby="form-dialog-title">
		<DialogTitle id="form-dialog-title">Objective Update</DialogTitle>
		<DialogContent>
			<DialogContentText>Enter a new distance objective (in kilometers) and confirm to update the value.</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label="Distance Objective"
				type="number"
				fullWidth
			/>
		</DialogContent>
		<DialogActions>
			<Button onClick={() => props.onCancel()} color="primary">Cancel</Button>
			<Button onClick={() => props.onSubmit(0)} color="primary">Submit</Button>
		</DialogActions>
	</Dialog>;
}