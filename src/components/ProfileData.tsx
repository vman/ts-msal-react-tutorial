import React from "react";

/**
 * Renders information about the user obtained from Microsoft Graph
 */
export const ProfileData = (props: any) => {
    return (
        <div id="profile-div">
            <p><strong>First Name: </strong> {props.graphData.givenName}</p>
            <p><strong>Last Name: </strong> {props.graphData.surname}</p>
            <p><strong>Email: </strong> {props.graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {props.graphData.id}</p>
        </div>
    );
};