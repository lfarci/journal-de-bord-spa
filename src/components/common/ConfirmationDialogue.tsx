import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core"

interface IConfirmationDialogueProps {
    title: string;
    text: string;
    confirmButtonText?: string;
    onConfirmation: () => void;
    onClose: () => void;
};

const ConfirmationDialogue = (props: IConfirmationDialogueProps) => {

    const DEFAULT_CONFIRM_BUTTON_TEXT = "Confirm";

    const confirmButtonText = (): string => {
        return props.confirmButtonText === undefined
            ? DEFAULT_CONFIRM_BUTTON_TEXT
            : props.confirmButtonText;
    }

    return <Dialog
        open={true}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.text}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose} color="primary">Cancel</Button>
            <Button onClick={props.onConfirmation} color="primary" autoFocus>{confirmButtonText()}</Button>
        </DialogActions>
    </Dialog>
}

export default ConfirmationDialogue;