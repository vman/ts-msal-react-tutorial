import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { AccountInfo } from "@azure/msal-common";
//import { username } from "../authConfig";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props: any) => {
    //const { instance } = useMsal();
    //const accountInfo = instance.getAccountByUsername(props.username);

    //type AccountInfoPreview = Partial<Pick<AccountInfo, "homeAccountId" | "localAccountId" | "username">>;

    // const account : AccountInfoPreview = {
    //     username : accountInfo?.username as string
    // };

    // const isAuthenticated = useIsAuthenticated(account);

    const accountIdentifiers = {
        username: props.username
    };

    const isAuthenticated = useIsAuthenticated(accountIdentifiers);

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/">MSAL React Tutorial</a>
                {isAuthenticated ? <SignOutButton username={props.username} /> : <SignInButton username={props.username} />}
            </Navbar>
            <h5>Welcome to the Microsoft Authentication Library For React Tutorial</h5>
            <br />
            <br />
            {props.children}
        </>
    );
};