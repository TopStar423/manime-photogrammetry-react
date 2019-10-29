import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OrderReviewPicUriModal from './OrderReviewPicUriModal';

export default class OrderReviewPicUri extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPortal: false
        };

        this.buttonStyle = {
            width: '120px',
            marginLeft: '10px',
            height: '30px'
        };

        this.openOrderReviewPicUri = this.openOrderReviewPicUri.bind(this);
    }

    openOrderReviewPicUri = () => {
        this.setState({ showPortal: true })
    };

    closeOrderReviewPicUri = () => {
        this.setState({ showPortal: false })
    };

    render() {
        const { data } = this.props;
        const { showPortal } = this.state;

        return (
            <React.Fragment>
                <button
                    style={this.buttonStyle}
                    onClick={this.openOrderReviewPicUri}>
                    Show
                </button>
                {showPortal &&
                ReactDOM.createPortal(
                    <OrderReviewPicUriModal
                        data={data}
                        onCloseModal={this.closeOrderReviewPicUri}
                    />,
                    document.getElementById('layout')
                )
                }
            </React.Fragment>
        )
    }
}
