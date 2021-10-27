import React from "react";
import { useMsal } from "@azure/msal-react";
//import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";
import { AccountInfo, IPublicClientApplication, PopupRequest, RedirectRequest } from "@azure/msal-browser";

function handleLogin(instance: IPublicClientApplication, username: string) {
    //const currentAccount = instance.getAccountByUsername(username) as AccountInfo;

    const loginRequest : PopupRequest = {
        scopes: ["User.Read"],
        prompt: 'select_account'
    };

    // if(currentAccount){
    //     loginRequest.account = currentAccount
    // }

    // instance.loginRedirect(loginRequest).catch(e => {
    //     console.error(e);
    // });

    instance.loginPopup(loginRequest).catch(e => {
        console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = (props: any) => {
    const { instance } = useMsal();

    return (
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance, props.username)}>Sign in</Button>
        // <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance)}>Sign in</Button>
    );
}