import React, { Component } from 'react';

export default class OrderReviewSelectStatus extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    handleChangeStatus = value => {
        this.setState({ value });
    };

    componentDidMount() {
        const { fit } = this.props;
        const value = fit === 'Good' ? 'Done' : this.props.value;
        this.setState({ value });
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
