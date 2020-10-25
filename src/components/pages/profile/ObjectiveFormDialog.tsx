import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IObjectiveFormDialogProps {
	open: boolean;
	value: number;
	onSubmit: (value: number) => void;
	onCancel: () => void;
}

interface ObjectiveFormDialogState {
	objective: number;
	isValid: boolean;
}

export default function ObjectiveFormDialog(props: IObjectiveFormDialogProps) {

	const [state, setState] = useState<ObjectiveFormDialogState>({
		objective: props.value,
		isValid: true
	});

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
				value={state.objective}
				onChange={(event: React.ChangeEvent<any>) => {
					const objective: number = event.target.value;
					setState({ objective: objective, isValid: objective >= 0})
				}}
				error={!state.isValid}
				fullWidth
			/>
		</DialogContent>
		<DialogActions>
			<Button onClick={() => props.onCancel()} color="primary">Cancel</Button>
			<Button onClick={() => props.onSubmit(state.objective)} color="primary">Submit</Button>
		</DialogActions>
	</Dialog>;
}