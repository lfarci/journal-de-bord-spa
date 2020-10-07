import React, { useEffect, useState } from "react";
import { AuthService } from "../../services/AuthService";
import Callback from "./callbacks/Callback";

interface ISilentRenewCallbackState {
    isLoading: boolean;
    error: Error | null;
}

function SilentRenewCallback() {

    const [state, setState] = useState<ISilentRenewCallbackState>({
        isLoading: true,
        error: null
    });

    useEffect(() => {
        new AuthService()._userManager.signinSilentCallback().catch((error: Error) => {
            setState({isLoading: false, error: error});
        });
    }, []);

    return <Callback
        isLoading={state.isLoading}
        errorTitle="An error occured while we were trying to silently renew the access token."
        error={state.error}
    />
}

export default SilentRenewCallback;