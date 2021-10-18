import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";
import { AccountInfo, IPublicClientApplication } from "@azure/msal-browser";

function handleLogin(instance: IPublicClientApplication, username: string) {
    const currentAccount = instance.getAccountByUsername(username);

    const loginRequest = {
        scopes: ["User.Read"],
        account: currentAccount as AccountInfo
    };

    instance.loginRedirect(loginRequest).catch(e => {
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
    );
}