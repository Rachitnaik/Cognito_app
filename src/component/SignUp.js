import React, { useState } from "react";
import Userpool from "../Userpool";
import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationCode, setShowVerificationCode] = useState(false);

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, givenName, familyName }),
      });
      const data = await response.json();
      console.log(data);
      const attributes = [
        new CognitoUserAttribute({
          Name: "given_name",
          Value: givenName,
        }),
        new CognitoUserAttribute({
          Name: "family_name",
          Value: familyName,
        }),
      ];
      Userpool.signUp(email, password, attributes, null, (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data);
          setShowVerificationCode(true);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const verificationCodeHandler = async (event) => {
    event.preventDefault();
    const user = new CognitoUser({
      Username: email,
      Pool: Userpool,
    });
    user.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
       
      }
    });
  };

  return (
    <div className="container">
      {!showVerificationCode ? (
        <form onSubmit={signUpHandler}>
          <p style={{ textAlign: "center" }}>SignUp</p>
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

          <label htmlFor="givenName">Given Name</label>
          <input
            value={givenName}
            onChange={(event) => setGivenName(event.target.value)}
          ></input>

          <label htmlFor="familyName">Family Name</label>
          <input
            value={familyName}
            onChange={(event) => setFamilyName(event.target.value)}
          ></input>

          <button type="submit">SignUp</button>
          <br></br>

          <p style={{ textAlign: "center" }}>Login</p>
          <br></br>
          <br></br>
        </form>
      ) : (
        <form onSubmit={verificationCodeHandler}>
          <label htmlFor="verificationCode">Verification Code:</label>
          <input
            type="text"
            value={verificationCode}
            onChange={(event) => setVerificationCode(event.target.value)}
          ></input>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default SignUp;

// import React, { useState } from "react";
// import Userpool from "../Userpool";
// import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
// import "./SignUp.css";

// function SignUp() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [givenName, setGivenName] = useState("");
//   const [familyName, setFamilyName] = useState("");
//   const [verificationCode, setVerificationCode] = useState("");
//   const [showVerificationCode, setShowVerificationCode] = useState(false);

//   const signUpHandler = (event) => {
//     event.preventDefault();
//     const attributes = [
//       new CognitoUserAttribute({
//         Name: "given_name",
//         Value: givenName,
//       }),
//       new CognitoUserAttribute({
//         Name: "family_name",
//         Value: familyName,
//       }),
//     ];
//     Userpool.signUp(email, password, attributes, null, (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(data);
//         setShowVerificationCode(true);
//       }
//     });
//   };

//   const verificationCodeHandler = (event) => {
//     event.preventDefault();
//     const user = new CognitoUser({
//       Username: email,
//       Pool: Userpool,
//     });
//     user.confirmRegistration(verificationCode, true, (err, result) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log(result);
//         // Redirect the user to the login page or display a success message
//       }
//     });
//   };

//   return (
//     <div className="container">
//       {!showVerificationCode ? (
//         <form onSubmit={signUpHandler}>
//           <p style={{ textAlign: "center" }}>SignUp</p>
//           <label htmlFor="email">Email </label>
//           <input
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//           ></input>

//           <label htmlFor="password">Password</label>
//           <input
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           ></input>

//           <label htmlFor="givenName">Given Name</label>
//           <input
//             value={givenName}
//             onChange={(event) => setGivenName(event.target.value)}
//           ></input>

//           <label htmlFor="familyName">Family Name</label>
//           <input
//             value={familyName}
//             onChange={(event) => setFamilyName(event.target.value)}
//           ></input>

//           <button type="submit">SignUp</button>
//           <br></br>

//           <p style={{ textAlign: "center" }}>Login</p>
//           <br></br>
//           <br></br>
//         </form>
//       ) : (
//         <form onSubmit={verificationCodeHandler}>
//           <label htmlFor="verificationCode">Verification Code:</label>
//           <input
//             type="text"
//             value={verificationCode}
//             onChange={(event) => setVerificationCode(event.target.value)}
//           ></input>

//           <button type="submit">Submit</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default SignUp;
