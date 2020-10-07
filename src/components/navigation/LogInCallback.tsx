import { CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { AuthService } from "../../services/AuthService";

import "./LogInCallback.scss";

interface ILogInCallbackState {
    isLoading: boolean;
    error: Error | null;
}

function LogInCallback() {

    const [state, setState] = useState<ILogInCallbackState>({
        isLoading: true,
        error: null
    });

    useEffect(() => {
        new AuthService()._userManager.signinRedirectCallback().then(function () {
            setState({isLoading: true, error: null});
            window.location.href = "/home";
        }).catch(function (e) {
            setState({isLoading: false, error: e});
            console.error(e);
        });
    }, []);

    return <div className="login-callback-root">
        {state.isLoading && state.error == null && <CircularProgress color="primary" />}
        {!state.isLoading && state.error != null && <div className="login-callback-error">
            <Typography variant="h6">Sorry about that!</Typography>
        <Typography variant="subtitle1">An error occured while we were trying to log you in. (Error message: {state.error.message})</Typography>
        </div>}
    </div>;
}

export default LogInCallback;