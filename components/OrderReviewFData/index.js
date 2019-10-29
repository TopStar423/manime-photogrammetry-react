import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OrderReviewFDataModal from './OrderReviewFDataModal';

export default class OrderReviewFData extends Component {
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

        this.openOrderReviewFData = this.openOrderReviewFData.bind(this);
    }

    openOrderReviewFData = () => {
        this.setState({ showPortal: true })
    };

    closeOrderReviewFData = () => {
        this.setState({ showPortal: false })
    };

    render() {
        const { data } = this.props;
        const { showPortal } = this.state;

        return (
            <React.Fragment>
                <button
                    style={this.buttonStyle}
                    onClick={this.openOrderReviewFData}>
                    Show
                </button>
                {showPortal &&
                    ReactDOM.createPortal(
                        <OrderReviewFDataModal
                            data={data}
                            onCloseModal={this.closeOrderReviewFData}
                        />,
                        document.getElementById('layout')
                    )
                }
            </React.Fragment>
        )
    }
}
