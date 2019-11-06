import React, { Component } from 'react';
import { updateReviewColumn } from '../utils/lambdaFunctions';

export default class OrderReviewSelectStatus extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    handleChangeStatus = ev => {
        const { reviewId, columnName } = this.props;
        const value = ev.target.value;
        this.setState({ value });
        updateReviewColumn(reviewId, columnName, value);
    };

    componentDidMount() {
        const { fit, value } = this.props;
        const statusValue = fit === 'Good' ? 'Done' : value || 'To be done';
        this.setState({ value: statusValue });
    }

    render() {
        const { value } = this.state;

        return (
            <select style={this.props.selectStyle} onChange={this.handleChangeStatus} value={value}>
                <option value='Done'>Done</option>
                <option value='To be done'>To be done</option>
            </select>
        );
    }
}
