import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { IPublicClientApplication } from "@azure/msal-browser";

function handleLogout(instance: IPublicClientApplication, username: string) {
    // instance.logoutPopup().catch(e => {
    //     console.error(e);
    // });

    const currentAccount = instance.getAccountByUsername(username);
    instance.logoutRedirect({
        account: currentAccount,
        postLogoutRedirectUri: "http://localhost:3000/"
    });
}


/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = (props: any) => {
    const { instance } = useMsal();

    return (
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogout(instance, props.username)}>Sign out</Button>
    );
}