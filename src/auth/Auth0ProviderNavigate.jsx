/* eslint-disable react/prop-types */
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderNavigate = ({ children }) => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience=import.meta.env.VITE_AUDIENCE
    const navigate=useNavigate();

    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error("Unable to initialize auth");
    }

    const onRedirectCallback = async () => {
        
        navigate("/auth/callback")
       
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            cacheLocation="localstorage"
            authorizationParams={{ redirect_uri: redirectUri,
                audience
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderNavigate;
