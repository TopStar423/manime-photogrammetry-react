import Amplify from 'aws-amplify';

export function configureAmplify() {
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
      mandatorySignIn: true
    },
    Storage: {
      // bucket: 'mani-me-react-native-userfiles-1',
      bucket: 'mani-me-app',
      region: 'us-west-2'
    },
    API: {
      endpoints: [
        {
          name: 'LambdaRDSDev',
          endpoint: 'https://4vitfcmpx9.execute-api.us-west-1.amazonaws.com/dev',
          service: 'execute-api',
          region: 'us-west-1'
        },
        {
          name: 'LambdaDDB',
          endpoint: 'https://9r8dtkpky7.execute-api.us-west-1.amazonaws.com/default',
          service: 'execute-api',
          region: 'us-west-1'
        },
        {
          name: 'LambdaPayment',
          endpoint: 'https://d1d6vzzpgk.execute-api.us-west-1.amazonaws.com/Live',
          service: 'execute-api',
          region: 'us-west-1'
        },
        {
          name: 'LambdaRDS',
          endpoint: 'https://2ehwnnicy0.execute-api.us-west-1.amazonaws.com/v1',
          service: 'execute-api',
          region: 'us-west-1'
        },
        {
          name: 'LambdaRDSClient',
          endpoint: 'https://2ehwnnicy0.execute-api.us-west-1.amazonaws.com/v1',
          service: 'execute-api',
          region: 'us-west-1'
        },
        {
          name: 'LambdaRDSClientNoncritical',
          endpoint: 'https://seet0wnvr7.execute-api.us-west-1.amazonaws.com/default',
          service: 'execute-api',
          region: 'us-west-1'
        },
        {
          name: 'LambdaRDSCompany',
          endpoint: 'https://bems9o4jfe.execute-api.us-west-1.amazonaws.com/default',
          service: 'execute-api',
          region: 'us-west-1'
        },
        {
          name: 'LambdaServer',
          endpoint: 'https://frclo239p9.execute-api.us-west-1.amazonaws.com/production',
          service: 'execute-api',
          region: 'us-west-1'
        }
      ]
    }
  });
}

export function setDefaultBucket() {
  Amplify.Storage.configure({
    bucket: 'mani-me-app',
    level: 'public',
    region: 'us-west-1',
    identityPoolId: 'us-west-2:b4e78795-8aed-47ea-931b-ea1d9cdc4c28'
  });
}

export function setStorageBucket(bucket) {
  Amplify.Storage.configure({
    bucket,
    level: 'public',
    region: 'us-west-1',
    identityPoolId: 'us-west-2:b4e78795-8aed-47ea-931b-ea1d9cdc4c28'
  });
}
