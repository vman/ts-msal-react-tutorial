import React, { useState, useEffect } from "react";
import { PageLayout } from "./components/PageLayout";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useMsalAuthentication } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import { username, username2 } from "./authConfig";
import { AccountInfo } from "@azure/msal-common";

// function App() {

//   return (
//       <>
//       <PageLayout username={username}>
//           <AuthenticatedTemplate username={username}>
//               <ProfileContent username={username}  />
//           </AuthenticatedTemplate>
//           <UnauthenticatedTemplate username={username}>
//               <p>You are not signed in! Please sign in.</p>
//           </UnauthenticatedTemplate>
//       </PageLayout>
//       {/* <PageLayout username={username2}>
//           <AuthenticatedTemplate username={username2}>
//               <ProfileContent username={username2}  />
//           </AuthenticatedTemplate>
//           <UnauthenticatedTemplate username={username2}>
//               <p>You are not signed in! Please sign in.</p>
//           </UnauthenticatedTemplate>
//       </PageLayout> */}
//       </>
//   );
// }


import { InteractionType } from '@azure/msal-browser';

function App() {
  const request = {
    //loginHint: "name@example.com",
    scopes: ["User.Read"]
  }
  const { login, result, error } = useMsalAuthentication(InteractionType.Silent, request);

  // useEffect(() => {
  //     if (error) {
  //         login(InteractionType.Redirect, request);
  //     }
  // }, [error]);

  const { accounts } = useMsal();

  function handleLogin() {
    login(InteractionType.Redirect, request);
  }
  return (
    <React.Fragment>
      <p>Anyone can see this paragraph.</p>
      <AuthenticatedTemplate>
        {accounts.map((account) => {
          // return <p>Signed in as: {account.username}</p>
          return <ProfileContent username={account.username}  />
        })}

      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>No users are signed in!</p>
      </UnauthenticatedTemplate>
      <Button variant="secondary" onClick={handleLogin}>Sign in</Button>
    </React.Fragment>
  );
}

//export default App;

function ProfileContent(props: any) {
  const { instance } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const account = instance.getAccountByHomeId(props.username);

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
      <h5 className="card-title">Welcome {props.username}</h5>
      {graphData ?
        <ProfileData graphData={graphData} />
        :
        <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
      }
    </>
  );
};

export default App;