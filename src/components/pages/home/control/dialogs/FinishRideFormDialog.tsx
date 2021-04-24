import React, { useCallback, useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Button, DialogContentText } from '@material-ui/core';
import RideService, { isLastRideFinished } from '../../../../../services/Rides';
import StopService, { StopData } from '../../../../../services/StopService';

import { useEffect } from 'react';
import { FormDialog } from '.';

interface IFinishRideFormDialogProps {
    open: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

interface IFinishRideFormDialogState {
    loading: boolean;
    error: Error | undefined;
}

function FinishRideFormDialog(props: IFinishRideFormDialogProps) {

    const [state, setState] = useState<IFinishRideFormDialogState>({
        loading: false,
        error: undefined
    });

    const [stop, setStop] = useState<StopData | undefined>(undefined);

    const startDisabled = () => state.loading || state.error !== undefined;

    const requireToBeTracking = useCallback(async (): Promise<void> => {
        try {
            setState(prev => ({...prev, loading: true}));
            if (!(await isLastRideFinished())) {
                setState(prev => ({...prev, loading: false}));
            } else {
                const error = new Error("You cannot finish a ride because you are not tracking a ride.");
                setState(prev => ({...prev, loading: false, error: error}));
            }
        } catch (error) {
            const e = new Error("An error occured while loading the dialog. Try again.");
            setState(prev => ({...prev, loading: false, error: e }));
        }
    }, []);

    const startRide = async (): Promise<void> => {
        try {
            if (stop) {
                setState(prev => ({...prev, loading: true}));
                const stopId = await StopService.create(stop);
                await RideService.create({ departure: stopId, trafficCondition: 0 });
                props.onSubmit();
            }
        } catch (error) {
            const e = new Error("An error occured while starting your ride. Try again.");
            setState(prev => ({...prev, loading: false, error: e }));
        }
    };

    const cancel = (): void => {
        if (!state.loading) {
            setState(prev => ({...prev, loading: false, error: undefined }));
            props.onCancel();
        }
    };

    useEffect(() => {
        requireToBeTracking();
    }, [requireToBeTracking, props.open]);

    return <FormDialog title="Starting a new ride" open={props.open} onClose={cancel} loading={state.loading} error={state.error}>
        <DialogContent>
            <DialogContentText>
                This is the finish dialog form
            </DialogContentText>
            {/* <StopForm onChange={setStop} /> */}
        </DialogContent>
        <DialogActions>
            <Button onClick={cancel} color="primary" disabled={state.loading}>Cancel</Button>
            <Button onClick={startRide} color="primary" disabled={startDisabled()}>Finish</Button>
        </DialogActions>
    </FormDialog>;
}

export default FinishRideFormDialog;