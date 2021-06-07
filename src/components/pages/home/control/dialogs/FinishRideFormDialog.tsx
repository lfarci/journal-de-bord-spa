import React, { useCallback, useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Button, DialogContentText } from '@material-ui/core';
import RideService, { getLastRide, isLastRideFinished } from '../../../../../services/Rides';
import StopService, { StopData } from '../../../../../services/StopService';

import { useEffect } from 'react';
import { FormDialog } from '.';
import StopForm from '../../../rides/form/StopForm';
import { CommentField, TrafficCondition, TrafficConditionField } from '../../../rides/form/fields';
import { Ride } from '../../../../../types';

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

    const [initialized, setInitialized] = useState<boolean>(false);
    const [departureOdometerValue, setDepartureOdometerValue] = useState<number | undefined>(undefined);
    const [arrivalOdometerValue, setArrivalOdometerValue] = useState<number | undefined>(undefined);
    const [state, setState] = useState<IFinishRideFormDialogState>({
        loading: false,
        error: undefined
    });

    const [stop, setStop] = useState<StopData | undefined>(undefined);
    const [trafficCondition, setTrafficCondition] = useState<TrafficCondition>(TrafficCondition.CALM);
    const [comment, setComment] = useState<string | undefined>(undefined);

    const hasOdometerValues = () => departureOdometerValue !== undefined && arrivalOdometerValue !== undefined;
    const validOdometer = () => hasOdometerValues() && departureOdometerValue!! <= arrivalOdometerValue!!;
    const finishDisabled = () => state.loading || state.error !== undefined || !validOdometer();

    const requireToBeTracking = useCallback(async (): Promise<void> => {
        try {
            setState(prev => ({ ...prev, loading: true, error: undefined }));
            if (!(await isLastRideFinished())) {
                setState(prev => ({ ...prev, loading: false }));
            } else {
                const error = new Error("You cannot finish a ride because you are not tracking a ride.");
                setState(prev => ({ ...prev, loading: false, error: error }));
            }
        } catch (error) {
            const e = new Error("An error occured while loading the dialog. Try again.");
            setState(prev => ({ ...prev, loading: false, error: e }));
        }
    }, []);

    const initialize = async (): Promise<void> => {
        try {
            const ride: Ride | undefined = await getLastRide();
            if (ride?.departure && ride.departure.odometerValue) {
                setDepartureOdometerValue(ride.departure.odometerValue);
            }
        } catch (error) {
            const e = new Error("An error occured while finishing your ride.");
            setState(prev => ({ ...prev, loading: false, error: e }));
        }
    };

    const finishRide = async (): Promise<void> => {
        try {
            if (stop) {
                setState(prev => ({ ...prev, loading: true }));
                const ride: Ride | undefined = await getLastRide();
                if (ride && ride.id && ride.departure.id) {
                    const arrivalId = await StopService.create(stop);
                    await RideService.updateById(ride.id, { 
                        departure: ride.departure.id,
                        arrival: arrivalId,
                        trafficCondition: trafficCondition, 
                        comment: comment
                    });
                    props.onSubmit();
                }
            }
        } catch (error) {
            const e = new Error("An error occured while starting your ride. Try again.");
            setState(prev => ({ ...prev, loading: false, error: e }));
        }
    };

    const cancel = (): void => {
        if (!state.loading) {
            setState(prev => ({ ...prev, loading: false, error: undefined }));
            props.onCancel();
        }
    };

    useEffect(() => {
        requireToBeTracking();
        if (!initialized) {
            initialize();
            setInitialized(true);
        }
    }, [requireToBeTracking, props.open, initialized]);

    return <FormDialog title="Finish tracking your ride" open={props.open} onClose={cancel} loading={state.loading} error={state.error}>
        <DialogContent>
            <DialogContentText>
                This is the finish dialog form
            </DialogContentText>
            <StopForm 
                odometerMin={departureOdometerValue}
                onOdometerChange={setArrivalOdometerValue}
                onChange={setStop}
            />
            <TrafficConditionField
                id="traffic-condition"
                label="Traffic condition"
                hint="Select the option that represent the best the traffic condition of your last ride."
                value={trafficCondition}
                onChange={setTrafficCondition}
            />
            <CommentField
                id="comment"
                label="Comment"
                hint="Let us know if you encountered any difficulties during your ride."
                value={comment}
                onChange={setComment}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={cancel} color="primary" disabled={state.loading}>Cancel</Button>
            <Button onClick={finishRide} color="primary" disabled={finishDisabled()}>Finish</Button>
        </DialogActions>
    </FormDialog>;
}

export default FinishRideFormDialog;