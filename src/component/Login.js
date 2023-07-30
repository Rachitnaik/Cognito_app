import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Userpool from "../Userpool";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: Userpool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess: ", data);
      },
      onFailure: (err) => {
        console.log("onFailure:", err);
      },

      newPasswordRequired: (data) => {
        console.log("newPasswordRequired:", data);
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="email">Email </label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
