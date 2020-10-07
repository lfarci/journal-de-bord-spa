import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";

import "./Callback.scss";

interface ICallbackProps {
    isLoading: boolean;
    errorTitle: string;
    error: Error | null;
}

function Callback(props: ICallbackProps) {
    return <div className="callback-root">
        {props.isLoading && props.error == null && <CircularProgress color="primary" />}
        {!props.isLoading && props.error != null && <div className="callback-error">
            <Typography variant="h6">Sorry about that!</Typography>
        <Typography variant="subtitle1">{props.errorTitle} (Error message: {props.error.message})</Typography>
        </div>}
    </div>;
}

export default Callback;