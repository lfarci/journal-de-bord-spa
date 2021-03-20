import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, DialogContentText } from '@material-ui/core';
import { Driver } from '../../../types';
import { OdometerField } from '../rides/form/fields';
import { AuthService } from '../../../services/AuthService';

interface IDriverFormDialogProps {
    open: boolean;
    onSubmit: (value: Driver) => void;
    onCancel: () => void;
}

function DriverFormDialog(props: IDriverFormDialogProps) {

    const [objective, setObjective] = useState<number>(0);

    return <Dialog open={props.open} onClose={props.onCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Welcome!</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Fill the form and click submit and start using the application.
            </DialogContentText>
            <OdometerField 
                id="driver-dialog-form-odometer"
                label="Objective"
                placeholder="e.g. 1500 km."
                hint="This is the number of kilometers you want to reach to complete your training."
                value={objective}
                onChange={setObjective}
                min={0}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => props.onCancel()} color="primary">Exit</Button>
            <Button 
                onClick={async () => {
                    const user = await new AuthService().getUser();
                    if (user) {
                        props.onSubmit({
                            identifier: user.profile.sub,
                            objective: objective
                        });
                    }
                }}
                color="primary">
                    Submit
            </Button>
        </DialogActions>
    </Dialog>;
}

export default DriverFormDialog;