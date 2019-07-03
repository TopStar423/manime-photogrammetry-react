import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Draggable } from 'react-smooth-dnd';
import { queryAdminDynamoDB, listAdminDynamoDB, addAttributeAdminDynamoDB, deleteAttributeAdminDynamoDB, updateUserColumn } from '../utils/lambdaFunctions';
import { API, Storage } from 'aws-amplify';

import { connect } from 'react-redux';
import userData from '../reducers/userData';
import { DEFAULT } from '../actions';

const DndContainer = styled.div`
    display: flex;
`;
const DndColumn = styled.div`
    width: 200px;
    margin: 10px;
    padding: 10px;
    border: 1px solid #eee;
    .smooth-dnd-container {
        height: 100%;
    }
`;
const Item = styled.div`
    padding: 10px;
    margin: 2px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 2px #00000080;
    cursor: pointer;
`;

export class UserAccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAdmin: '',
            users: [],
            adminList: [],
            adminIdList: [],
            userList: [],
            userObjectList: [],
            accessList: [],
        }
    }

    componentDidMount() {
      this.getUsers();
      this.testLambdaFunctions();
    }

    getUsers = () => {
      // store in state all client id
      let userInit = {
        headers: { 'Content-Type': 'application/json' }
      }
      API.get('LambdaRDSClient', '/users/cms/read', userInit).then(response => {
        if(response && response.rows) {
          const users = response.rows.map(item => {
            return {
              userId: item.userid,
              email: item.email
            };
          })
          this.setState({ users });
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    testLambdaFunctions = async () => {
      let result;
      // store admin users
      result = await listAdminDynamoDB();
      const adminList = result.map(item => {
        return item.username;
      });
      const adminIdList = result.map(item => {
        return item.userId;
      });
      this.setState({ adminList: result });
    }

    selectAdmin = async selectedAdmin => {
      let result = await queryAdminDynamoDB(selectedAdmin);
      // const resultKeys = Object.values(result);
      const { userId, username, ...accessObject } = result;
      let accessList = Object.values(accessObject);
      // console.log(accessList);

      // split into two tables -> userlist and accessList
      const userObjectList = this.state.users.filter(user => {
        if (accessList.includes(user.userId)) return false;
        else return true;
      });
      // console.log(userObjectList);
      // FIXME:  this sets it to userId instead of email
      const userList = userObjectList.map(user => {
        return user.userId;
      });

      this.setState({ accessList, userList, selectedAdmin });
    }

    adminAccessAddClient = async clientId => {
      return await addAttributeAdminDynamoDB(this.state.selectedAdmin, clientId);
    }

    adminAccessRemoveClient = async clientId => {
      return await deleteAttributeAdminDynamoDB(this.state.selectedAdmin, clientId);
    }

    applyDrag = (arr, dragResult) => {
        const { removedIndex, addedIndex, payload } = dragResult;
        if (removedIndex === null && addedIndex === null) return arr;

        const result = [...arr];
        let itemToAdd = payload;

        if (removedIndex !== null) {
            itemToAdd = result.splice(removedIndex, 1)[0];
            this.adminAccessRemoveClient(itemToAdd);
        }

        if (addedIndex !== null) {
            result.splice(addedIndex, 0, itemToAdd);
            this.adminAccessAddClient(itemToAdd);
        }

        return result;
    };

    render() {
        const { adminList, userList, accessList } = this.state;

        const user = this.props.userData ? this.props.userData.identityId : '';
        // this is the admin account, photogrammetry

        return (
          <React.Fragment>
            { user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea' ?
             <DndContainer>
                 <DndColumn>
                     <h3>Admin</h3>
                     { adminList.map((item, i) => (
                         <Item key={item.userId} onClick={() => this.selectAdmin(item.userId)}>{item.username}</Item>
                     ))}
                 </DndColumn>
                 <DndColumn>
                     <h3>User List</h3>
                     <Container groupName="1" getChildPayload={i => userList[i]} onDrop={e => this.setState({ userList: this.applyDrag(userList, e) })}>
                         { userList.map(item => (
                                 <Draggable key={item}>
                                     <Item>{item}</Item>
                                 </Draggable>
                             )
                         )}
                     </Container>
                 </DndColumn>
                 <DndColumn>
                     <h3>Access List</h3>
                     <Container groupName="1" getChildPayload={i => accessList[i]} onDrop={e => this.setState({ accessList: this.applyDrag(accessList, e) })}>
                         { accessList.map(item => (
                                 <Draggable key={item}>
                                     <Item>{item}</Item>
                                 </Draggable>
                             )
                         )}
                     </Container>
                 </DndColumn>
             </DndContainer>
             :
             <div></div>
           }
          </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
  userData: userData(state.userData, { type: 'DEFAULT' })
})

export default connect(
  mapStateToProps,
  null,
)(UserAccess);
