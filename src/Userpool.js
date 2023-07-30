import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_8IympjGGb",
  ClientId: "2p8m6jktpksdtdpasd7h57hng0",
};

export default new CognitoUserPool(poolData);
