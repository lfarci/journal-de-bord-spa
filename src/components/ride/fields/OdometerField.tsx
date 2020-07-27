import React from 'react';

import {TextField, InputAdornment} from '@material-ui/core';

interface IOdometerFieldProps {
    id: string;
    label: string;
    placeholder: string;
    hint: string;
}

/**
 * Renders a text field that take a required odometer value (number) as an
 * input.
 * 
 * Note: it would nice to actually show a formatted number.
 */
function OdometerField(props: IOdometerFieldProps) {
    return <TextField required
        id={props.id}
        label={props.label}
        type="number"
        placeholder={props.placeholder}
        variant="outlined"
        fullWidth={true}
        helperText={props.hint}
        margin="normal"
        InputProps={{
            endAdornment: <InputAdornment position="end">Km</InputAdornment>,
        }}
    />;
}

export default OdometerField;