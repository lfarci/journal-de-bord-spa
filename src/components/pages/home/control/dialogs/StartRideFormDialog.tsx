import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Stop } from "../../../../../types";
import { Button, CircularProgress, DialogContentText } from '@material-ui/core';
import StopForm from '../../../rides/form/StopForm';
import RideService from '../../../../../services/Rides';
import StopService from '../../../../../services/StopService';

import "./StartRideFormDialog.scss";

interface IStartRideFormDialogProps {
    open: boolean;
    onSubmit: (value: Stop) => void;
    onCancel: () => void;
}

interface IStartRideFormDialogState {
    loading: boolean;
    error: Error | undefined;
}

function StartRideFormDialog(props: IStartRideFormDialogProps) {

    const [state, setState] = useState<IStartRideFormDialogState>({
        loading: false,
        error: undefined
    });
    const [stop, setStop] = useState<Stop | undefined>(undefined);

    const startDisabled = () => state.loading || state.error != undefined;

    const startRide = async (): Promise<void> => {
        try {
            if (stop) {
                setState(prev => ({...prev, loading: true}));
                const stopId = await StopService.create(stop);
                await RideService.create({ departure: stopId, trafficCondition: 0 });
                setState(prev => ({...prev, loading: false}));
            }
        } catch (error) {
            console.log(error);
            setState(prev => ({...prev, loading: false, error: error }));
        }
    };

    const cancel = (): void => {
        if (!state.loading) {
            setState(prev => ({...prev, loading: false, error: undefined }));
            props.onCancel();
        }
    };

    return <Dialog open={props.open} onClose={cancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Starting a new ride</DialogTitle>
        <DialogContent>
            {state.loading && !state.error && <div className="form-dialog-progress"><CircularProgress /></div>}
            {!state.loading && state.error != undefined && <DialogContentText>
                An error occured while starting your ride. Try again.
            </DialogContentText>}
            {!state.loading && !state.error && <div>
                <DialogContentText>
                    Fill the form and click save to start tracking your ride.
                </DialogContentText>
                <StopForm onChange={setStop} />
            </div>}
        </DialogContent>
        <DialogActions>
            <Button onClick={cancel} color="primary" disabled={state.loading}>Cancel</Button>
            <Button onClick={startRide} color="primary" disabled={startDisabled()}>Start</Button>
        </DialogActions>
    </Dialog>;
}

export default StartRideFormDialog;