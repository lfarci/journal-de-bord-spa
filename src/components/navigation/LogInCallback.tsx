import React, { useEffect, useState } from "react";
import { AuthService } from "../../services/AuthService";

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
            setState({isLoading: false, error: null});
            window.location.href = "/home";
        }).catch(function (e) {
            setState({isLoading: false, error: e});
            console.error(e);
        });
    }, []);

    return <div>
        {state.isLoading && state.error == null && <h1>Authentification callback processing...</h1>}
        {!state.isLoading && state.error != null && <h1>Error after callback</h1>}

    </div>;
}

export default LogInCallback;