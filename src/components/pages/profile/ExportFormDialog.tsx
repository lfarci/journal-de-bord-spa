import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import { FormControlLabel, RadioGroup } from '@material-ui/core';

interface IObjectiveFormDialogProps {
	open: boolean;
	onSubmit: (value: string) => void;
	onCancel: () => void;
}

interface ObjectiveFormDialogState {
	format: string;
	isValid: boolean;
}

export default function ExportFormDialog(props: IObjectiveFormDialogProps) {

	const [state, setState] = useState<ObjectiveFormDialogState>({
		format: "json",
		isValid: true
	});

	const handleFormatChange = (event: React.ChangeEvent<any>) => {
		const format: string = event.target.value;
		setState((prev) => ({ ...prev, format: format }));
	};

	return <Dialog open={props.open} onClose={props.onCancel} aria-labelledby="form-dialog-title">
		<DialogTitle id="form-dialog-title">Export</DialogTitle>
		<DialogContent>
			<DialogContentText>
				You are able to download your journal. You can export it to a
				PDF or a JSON file. Choose and format and confirm to export.
			</DialogContentText>
			<RadioGroup
				aria-label="format"
				name="format"
				value={state.format}
				onChange={handleFormatChange}
			>
				<FormControlLabel value="json" control={<Radio />} label="JSON" />
				<FormControlLabel value="pdf" control={<Radio />} label="PDF" />
			</RadioGroup>
		</DialogContent>
		<DialogActions>
			<Button onClick={() => props.onCancel()} color="primary">Cancel</Button>
			<Button onClick={() => props.onSubmit(state.format)} color="primary">Export</Button>
		</DialogActions>
	</Dialog>;
}