import { Button, Typography } from "@material-ui/core";
import React from "react";

import "./ErrorMessage.scss";

interface IErrorMessageProps {
    title: string;
    message: string;
}

function ErrorMessage(props: IErrorMessageProps) {
    return <div className="error-message">
        <Typography variant="h6">{props.title}</Typography>
        <Typography variant="body1">{props.message}</Typography>
        <div className="error-message-actions">
            <Button variant="contained" color="secondary" onClick={() => window.location.href = "/home"}>Go back home</Button>
            <Button variant="contained" color="primary" onClick={() => window.location.reload() }>Try again</Button>
        </div>
    </div>;
}

export default ErrorMessage;