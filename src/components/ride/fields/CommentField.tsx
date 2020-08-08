import React from 'react';

import { TextField } from '@material-ui/core';

interface ICommentFieldProps {
    id: string;
    label: string;
    hint: string;
    value: string | undefined;
    onChange: (comment: string) => void;
}

/**
 * Renders a multiline text field that is used by the user to write a comment.
 */
function CommentField(props: ICommentFieldProps) {
    return <TextField multiline fullWidth={true}
        className="input"
        id={props.id}
        label={props.label}
        variant="outlined"
        rowsMax={4}
        margin="normal"
        helperText={props.hint}
        value={props.value}
        onChange={(event: React.ChangeEvent<any>) => {
            const comment = event.target.value;
            props.onChange(comment);
        }}
    />;
}

export default CommentField;