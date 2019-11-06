import React, { Component } from 'react';

export default class OrderReviewSelectStatus extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        }

        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    handleChangeStatus = value => {
        this.setState({ value });
    };

    componentDidMount() {
        const { fit, value } = this.props;
        const statusValue = fit === 'Good' ? 'Done' : value;
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
