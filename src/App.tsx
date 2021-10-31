import React, { useEffect } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useMsalAuthentication } from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { InteractionType } from '@azure/msal-browser';
import ProfileContent from "./components/ProfileContent";

const App: React.FunctionComponent = () => {
  const request = {
    scopes: ["User.Read"],
    prompt: 'select_account'
  }
  const { login, result, error } = useMsalAuthentication(InteractionType.Silent, request);

  // useEffect(() => {
  //     if (error) {
  //         login(InteractionType.Redirect, request);
  //     }
  // }, [error]);

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
          return <div key={account.homeAccountId}><ProfileContent homeId={account.homeAccountId} name={account.name as string}  /></div>
        })}

      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>No users are signed in!</p>
      </UnauthenticatedTemplate>
      <Button variant="secondary" onClick={handleLogin}>Sign in new user</Button>
    </React.Fragment>
  );
}

export default App;