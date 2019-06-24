import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Draggable } from 'react-smooth-dnd';

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
            adminList: ['Admin 1', 'Admin 2', 'Admin 3'],
            userList: ['Fancy@gmail.com', 'Rude@gmail.com', 'Plucky@gmail.com'],
            accessList: ['Elastic@gmail.com', 'Spicy@gmail.com', 'Drab@gmail.com', 'Noxious@gmail.com'],
        }
    }

    applyDrag = (arr, dragResult) => {
        const { removedIndex, addedIndex, payload } = dragResult;
        if (removedIndex === null && addedIndex === null) return arr;

        const result = [...arr];
        let itemToAdd = payload;

        if (removedIndex !== null) {
            itemToAdd = result.splice(removedIndex, 1)[0];
        }

        if (addedIndex !== null) {
            result.splice(addedIndex, 0, itemToAdd);
        }

        return result;
    };

    render() {
        const { adminList, userList, accessList } = this.state;

        return (
            <DndContainer>
                <DndColumn>
                    <h3>Admin</h3>
                    { adminList.map(item => (
                        <Item key={item}>{item}</Item>
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
        )
    }
}

export default UserAccess
