import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-west-2:821b6b82-5993-4344-9128-b335590b8e83',

    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_bJo7xSO7y',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '3rqrh33m3v3clqntomkpil81h6',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
  },
  Storage: {
    bucket: 'mani-me-react-native-userfiles-1',
    region: 'us-west-1',
  },
  API: {
        endpoints: [
            {
                name: "LambdaDDB",
                endpoint: "https://9r8dtkpky7.execute-api.us-west-1.amazonaws.com/default",
                service: "lambda",
                region: "us-west-1"
            },
            {
                name: "LambdaPayment",
                endpoint: "https://d1d6vzzpgk.execute-api.us-west-1.amazonaws.com/Live",
                service: "lambda",
                region: "us-west-1"
            },
            {
                name: "LambdaRDS",
                endpoint: "https://2ehwnnicy0.execute-api.us-west-1.amazonaws.com/default",
                service: "lambda",
                region: "us-west-1"
            }
        ]
    }
});

export default Amplify;
