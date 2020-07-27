import React from 'react';

import { InputLabel, FormControl, FormHelperText, Select, MenuItem } from '@material-ui/core';


enum TrafficCondition {
    VERY_CALM, CALM, NORMAL, SLOW, VERY_SLOW
}

interface ITrafficConditionFieldProps {
    id: string;
    label: string;
    hint: string;
    value: TrafficCondition;
    onChange: (event: React.ChangeEvent<any>, child?: React.ReactNode) => void | undefined;
}

/**
 * Renders a text field that take a required odometer value (number) as an
 * input.
 * 
 * Note: it would nice to use a rating component:
 * https://material-ui.com/components/rating/
 */
function TrafficConditionField(props: ITrafficConditionFieldProps) {
    return <FormControl variant="outlined" fullWidth={true} margin="normal">
        <InputLabel id="traffic-condition-label">{props.label}</InputLabel>
        <Select
            id={props.id}
            labelId="traffic-condition-label"
            value={props.value}
            onChange={props.onChange}
            label={props.label}
        >
            <MenuItem value={TrafficCondition.VERY_CALM}>Very calm</MenuItem>
            <MenuItem value={TrafficCondition.CALM}>Calm</MenuItem>
            <MenuItem value={TrafficCondition.NORMAL}>Normal</MenuItem>
            <MenuItem value={TrafficCondition.SLOW}>Slow</MenuItem>
            <MenuItem value={TrafficCondition.VERY_SLOW}>Very slow</MenuItem>
        </Select>
        <FormHelperText id="traffic-condition-help">
            {props.hint}
        </FormHelperText>
    </FormControl>;
}

export { TrafficCondition, TrafficConditionField};
export default TrafficConditionField;