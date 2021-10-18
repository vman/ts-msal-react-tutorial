import React, { useState } from "react";
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import { username } from "./authConfig";
import { username2 } from "./authConfig2";
import { AccountInfo } from "@azure/msal-common";

function App() {

  return (
      <>
      <PageLayout username={username}>
          <AuthenticatedTemplate username={username}>
              <ProfileContent username={username}  />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate username={username}>
              <p>You are not signed in! Please sign in.</p>
          </UnauthenticatedTemplate>
      </PageLayout>
      <PageLayout username={username2}>
          <AuthenticatedTemplate username={username2}>
              <ProfileContent username={username2}  />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate username={username2}>
              <p>You are not signed in! Please sign in.</p>
          </UnauthenticatedTemplate>
      </PageLayout>
      </>
  );
}

function ProfileContent(props: any) {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const account = instance.getAccountByUsername(props.username);

  //const name = accounts[0] && accounts[0].name;

  const name = account && account.name;

  function RequestProfileData() {
    const request = {
      ...loginRequest,
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
  }

  return (
    <>
      <h5 className="card-title">Welcome {name}</h5>
      {graphData ?
        <ProfileData graphData={graphData} />
        :
        <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
      }
    </>
  );
};

export default App;