import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OrderReviewQDataModal from './OrderReviewQDataModal';

export default class OrderReviewQData extends Component {
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

        this.openOrderReviewQData = this.openOrderReviewQData.bind(this);
    }

    openOrderReviewQData = () => {
        this.setState({ showPortal: true })
    };

    closeOrderReviewQData = () => {
        this.setState({ showPortal: false })
    };

    render() {
        const { data } = this.props;
        const { showPortal } = this.state;

        return (
            <React.Fragment>
                <button
                    style={this.buttonStyle}
                    onClick={this.openOrderReviewQData}>
                    Show
                </button>
                {showPortal &&
                ReactDOM.createPortal(
                    <OrderReviewQDataModal
                        data={data}
                        onCloseModal={this.closeOrderReviewQData}
                    />,
                    document.getElementById('layout')
                )}
            </React.Fragment>
        )
    }
}
