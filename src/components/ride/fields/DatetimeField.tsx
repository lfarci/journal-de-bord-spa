import React from 'react';

import { TextField } from '@material-ui/core';

interface IDatetimeFieldProps {
    id: string;
    label: string;
    hint: string;
    value: Date;
    onChange: (date: Date) => void;
}

function DatetimeField(props: IDatetimeFieldProps) {

    const handleChange = (event: React.ChangeEvent<any>, child?: React.ReactNode): void | undefined => {
        const dateString: string = event.target.value;
        const date: Date = new Date(dateString);
        props.onChange(date);
    }

    return <TextField
        className="input"
        id={props.id}
        label={props.label}
        type="datetime-local"
        variant="outlined"
        margin="normal"
        fullWidth={true}
        helperText={props.hint}
        onChange={handleChange}
        defaultValue="2017-05-24T10:30"
    />;
}

export default DatetimeField;