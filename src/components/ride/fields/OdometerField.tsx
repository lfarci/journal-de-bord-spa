import React, { useState } from 'react';

import { TextField, InputAdornment } from '@material-ui/core';

interface IOdometerFieldProps {
    id: string;
    label: string;
    placeholder: string;
    hint: string;
    value: number;
    onChange: (odometerValue: number) => void;
    min?: number;
}

/**
 * Renders a text field that take a required odometer value (number) as an
 * input.
 *
 * Note: it would nice to actually show a formatted number.
 */
function OdometerField(props: IOdometerFieldProps) {

    const [isValid, setValid] = useState<boolean>(true);
    const [hint, setHint] = useState<string>(props.hint);

    return <TextField required
        id={props.id}
        label={props.label}
        type="number"
        placeholder={props.placeholder}
        variant="outlined"
        fullWidth={true}
        helperText={hint}
        margin="normal"
        InputProps={{ endAdornment: <InputAdornment position="end">Km</InputAdornment>, }}
        onChange={(event: React.ChangeEvent<any>) => {
            const newValue: number = event.target.value;
            setValid(newValue > 0);
            if (newValue < 0)
                setHint("The value must be positive!");
            else if (props.min && newValue < props.min)
                setHint(`You started the ride with a value of ${props.min} km.`);
            else
                setHint(props.hint);
            props.onChange(newValue);
        }}
        error={!isValid}
    />;
}

export default OdometerField;