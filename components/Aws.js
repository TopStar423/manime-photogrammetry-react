import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-west-2:b4e78795-8aed-47ea-931b-ea1d9cdc4c28',

    // REQUIRED - Amazon Cognito Region
    region: 'us-west-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-west-2_Q0VbhAhFH',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '4eduettl9j0pum0u4sgca9b7pq',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,



    // // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: 'us-west-2:821b6b82-5993-4344-9128-b335590b8e83',
    //
    // // REQUIRED - Amazon Cognito Region
    // region: 'us-west-2',
    //
    // // OPTIONAL - Amazon Cognito User Pool ID
    // // userPoolId: 'us-west-2_bJo7xSO7y',
    // userPoolId: 'us-west-2_R4JCZQ1Cj',
    //
    // // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    // // userPoolWebClientId: '3rqrh33m3v3clqntomkpil81h6',
    // userPoolWebClientId: '7v2cojiqaf27ppebkk2ti9cmmi',
    //
    // // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    // mandatorySignIn: false

  },
  Storage: {
    // bucket: 'mani-me-react-native-userfiles-1',
    bucket: 'mani-me-app',
    region: 'us-west-2',
  },
  API: {
        endpoints: [
            {
                name: "LambdaDDB",
                endpoint: "https://9r8dtkpky7.execute-api.us-west-1.amazonaws.com/default",
                service: 'execute-api',
                region: "us-west-1"
            },
            {
                name: "LambdaPayment",
                endpoint: "https://d1d6vzzpgk.execute-api.us-west-1.amazonaws.com/Live",
                service: 'execute-api',
                region: "us-west-1"
            },
            {
                name: "LambdaRDSClient",
                endpoint: "https://2ehwnnicy0.execute-api.us-west-1.amazonaws.com/default",
                service: 'execute-api',
                region: "us-west-1"
            },
            {
                name: "LambdaRDSClientNoncritical",
                endpoint: "https://seet0wnvr7.execute-api.us-west-1.amazonaws.com/default",
                service: 'execute-api',
                region: "us-west-1"
            },
            {
                name: "LambdaRDSCompany",
                endpoint: "https://bems9o4jfe.execute-api.us-west-1.amazonaws.com/default",
                service: 'execute-api',
                region: "us-west-1"
            }
        ]
    }
});

export default Amplify;
