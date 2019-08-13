import React from 'react';
import { API } from 'aws-amplify';
import { updateUserColumn } from '../utils/lambdaFunctions';

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
    for (let i = row.length; i < rows.length; ++i){
      setTimeout(() => {
        if (rows[i].visible) {
          const body = {
            firstName: rows[i].firstname,
            lastName: rows[i].lastname,
            email: rows[i].email,
            verifiedEmail: true,
            note: rows[i].userid,
            accepts_marketing: true
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
            updateUserColumn(rows[i].userid, '_leftfingerscurvature', result.id);
          })
          .catch(err => {
            const errData = err.response ? err.response.data : err.response;
            this.setState({
              errors: [...this.state.errors, { ...user, err: errData }]
            }, () => {
              console.log(this.state.errors);
            })
          });
        }
      }, i * 540);
    }
  }

  componentDidMount() {
    let userInit = {
      headers: { 'Content-Type': 'application/json' }
    }
    API.get(endpoint, pathName, userInit).then(response => {
      this.throttledApi(response.rows);
    }).catch((err) => {
    });
  }

  render() {
    return (
      <div></div>
    );
  }
}
