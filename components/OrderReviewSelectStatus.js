import React, { Component } from 'react';
import {getGroupOrders, updateUserColumn} from "../utils/lambdaFunctions";
import {createUpdateSSOrder} from "../utils/shipStation";

export default class OrderReviewSelectStatus extends React.PureComponent {
    state = {
        value: this.props.value,
        isAdmin: this.props.user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea' || this.props.user == 'us-west-2:95a2f104-1308-42e3-bb65-033c4f9a6de4'
    };
    onChange = ev => {
        if (!this.state.isAdmin) {
            const value = ev.target.value;
            if (value == 'fittingValidated') return;
        }
        if (this.state.value != 'fittingValidated' && ev.target.value == 'fittingValidated')
            this.checkGroupOrdersForSS();
        this.setState({ value: ev.target.value });
        updateUserColumn(this.props.userId, this.props.columnName, ev.target.value);
    };

    checkGroupOrdersForSS = async () => {
        // find grouporders with id not shipped.
        let userGroupOrders = await getGroupOrders(this.props.userId);
        // console.log(userGroupOrders.rows);
        userGroupOrders.rows.map(groupOrder => {
            // console.log(groupOrder.grouporderstatus);
            if (groupOrder.grouporderstatus != 'shipped') {
                this.createUpdateSSWrapper(groupOrder);
            }
        })
    }

    render() {
        // const locked = this.state.isAdmin ? { backgroundColor: '#ff0000' } : { backgroundColor: '#ff0000' };
        return (
            <select style={this.props.selectStyle} onChange={this.onChange} value={this.state.value}>
                <option value='pictureInvalid'>Done</option>
                <option value='toBeFitted'>To be done</option>
            </select>
        );
    }
}
