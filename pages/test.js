import React from 'react';
import { API } from 'aws-amplify';

let pathName = '/users/cms/read';
const tableName = 'users';
const endpoint = 'LambdaRDSClient';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    }
  }

  throttledApi = rows => {
    for (let i = 0; i < rows.length; ++i){
      setTimeout(() => {
        if (rows[i].visible) {
          const body = {
            firstName: rows[i].firstname,
            lastName: rows[i].lastname,
            email: rows[i].email,
            verifiedEmail: true,
            note: rows[i].userid
          }
          let user = {
            firstName: rows[i].firstname,
            lastName: rows[i].lastname,
            email: rows[i].email,
            note: rows[i].userid
          };
          API.post('LambdaServer', '/shopify/customer/create', {
            body,
            headers: { 'Content-Type': 'application/json' }
          })
          .then(result => {

          })
          .catch(err => {
            this.setState({
              errors: [...this.state.errors, { ...user, err: err.response.data }]
            }, () => {
              console.log(this.state.errors);
            })
          });
        }
      }, i * 1000);
    }
  }

  componentDidMount() {
    let userInit = {
      headers: { 'Content-Type': 'application/json' }
    }
    // API.get(endpoint, pathName, userInit).then(response => {
    //   this.throttledApi(response.rows);
    // }).catch((err) => {
    // });
  }

  render() {
    return (
      <div></div>
    );
  }
}
