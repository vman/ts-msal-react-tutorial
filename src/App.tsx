import React, { useState, useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useMsalAuthentication } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import { AccountInfo } from "@azure/msal-common";


import { InteractionType } from '@azure/msal-browser';

function App() {
  const request = {
    scopes: ["User.Read"],
    prompt: 'select_account'
  }
  const { login, result, error } = useMsalAuthentication(InteractionType.Silent, request);

  useEffect(() => {
      if (error) {
          login(InteractionType.Redirect, request);
      }
  }, [error]);

  useEffect(() => {
    if(result){
      console.log(result);
    }
}, [result]);

  const { accounts } = useMsal();

  function handleLogin() {
    login(InteractionType.Redirect, request);
  }
  return (
    <React.Fragment>
      <AuthenticatedTemplate>
        {accounts.map((account) => {
          return <div key={account.homeAccountId}><ProfileContent homeId={account.homeAccountId} name={account.name}  /></div>
        })}

      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>No users are signed in!</p>
      </UnauthenticatedTemplate>
      <Button variant="secondary" onClick={handleLogin}>Sign in new user</Button>
    </React.Fragment>
  );
}

function ProfileContent(props: any) {
  const { instance } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const account = instance.getAccountByHomeId(props.homeId);
  
    const request = {
      scopes: ["User.Read"],
      account: account as AccountInfo
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(request).then((response) => {
      callMsGraph(response.accessToken).then(response => setGraphData(response));
    }).catch((e) => {
      instance.acquireTokenPopup(request).then((response) => {
        callMsGraph(response.accessToken).then(response => setGraphData(response));
      });
    });

  return (
    <>
      <h5 className="card-title">Welcome {props.name}</h5>
      {graphData &&
        <ProfileData graphData={graphData} />
      }
    </>
  );
};

export default App;