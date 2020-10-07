import React, { useEffect, useState } from "react";
import { AuthService } from "../../../services/AuthService";
import Callback from "./Callback";

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

    return <Callback
        isLoading={state.isLoading}
        errorTitle="An error occured while we were trying to log you in."
        error={state.error}
    />

}

export default LogInCallback;