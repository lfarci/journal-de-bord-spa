import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress, DialogContentText } from '@material-ui/core';

export interface IFormDialogProps {
    open: boolean;
    title: string;
    loading: boolean;
    error: Error | undefined;
    children: React.ReactNode;
    onClose: () => void;
}

function FormDialog(props: IFormDialogProps) {

    const loading = () => props.loading;
    const error = () => !props.loading && props.error !== undefined;
    const ready = () => !props.loading && props.error === undefined;

    return <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle className="form-dialog-title">{props.title}</DialogTitle>
        { ready()
            ? props.children
            : <DialogContent>
                { loading() && <div className="form-dialog-progress"><CircularProgress /></div> }
                { error() && <DialogContentText>{props.error?.message}</DialogContentText> }
              </DialogContent>
        }
    </Dialog>;
}

export default FormDialog;