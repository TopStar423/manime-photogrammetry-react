import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OrderReviewDetailsModal from './OrderReviewDetailsModal';

export default class OrderReviewDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPortal: false
        };

        this.buttonStyle = {
            width: '100px',
            marginLeft: '10px',
            marginRight: '20px',
            height: '30px',
            borderRadius: '8px'
        };

        this.openOrderReviewDetails = this.openOrderReviewDetails.bind(this);
        this.closeOrderReviewDetails = this.closeOrderReviewDetails.bind(this);
    }

    openOrderReviewDetails = () => {
        this.setState({ showPortal: true })
    };

    closeOrderReviewDetails = () => {
        this.setState({ showPortal: false })
    };

    render() {
        const { data } = this.props;
        const { showPortal } = this.state;

        return (
            <React.Fragment>
                <button
                    style={this.buttonStyle}
                    onClick={this.openOrderReviewDetails}>
                    Details
                </button>
                {showPortal &&
                ReactDOM.createPortal(
                    <OrderReviewDetailsModal
                        data={data}
                        onCloseModal={this.closeOrderReviewDetails}
                    />,
                    document.getElementById('layout')
                )}
            </React.Fragment>
        )
    }
}
