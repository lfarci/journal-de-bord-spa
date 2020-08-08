import React from 'react';

import { TextField } from '@material-ui/core';
import { Moment } from 'moment';

const moment = require("moment");

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

    const getDefaultValue = (date: Date): string => {
        const dateValue: string = moment(date).format("YYYY-MM-DDTHH:mm");
        console.log("Default value: " + dateValue);
        return dateValue;
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
        defaultValue={getDefaultValue(props.value)}
    />;
}

export default DatetimeField;