import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Amplify from '../components/Aws';
import { Auth } from 'aws-amplify';

class AuthComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Auth.signIn('test5', 'invalid password')
    // .then(user => console.log(user))
    // .catch(err => console.log(err.stack));
  }

  render() {
    return (
      <Layout before={false}>
      </Layout>
    );
  }
};

export default AuthComponent;
