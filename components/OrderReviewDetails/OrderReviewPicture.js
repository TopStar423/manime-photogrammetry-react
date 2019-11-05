import React, { Component } from 'react';
import { Storage } from 'aws-amplify';

export default class OrderReviewPicture extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: ''
        }
    }

    componentDidMount() {
        const { imageKey } = this.props;
        if (imageKey !== null && imageKey.indexOf('https') === -1) {
            Storage.get(imageKey)
                .then(result => {
                    this.setState({ image: result })
                })
        }
    }

    render() {
        const { image } = this.state;

        return (
            <img src={image} />
        )
    }
}
