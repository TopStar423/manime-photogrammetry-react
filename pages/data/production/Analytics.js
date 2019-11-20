import React, { Component } from 'react';
import {
    AnalyticsContainer,
    AnalyticsContents,
    AnalyticsHeader,
    AnalyticsItem,
    AnalyticsTotal
} from "../../../components/styled/BoardBody";

export default class Analytics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { unfulfilled } = this.props;

        return (
            <AnalyticsContainer>
                <AnalyticsHeader>Unfulfilled orders tracker</AnalyticsHeader>
                <AnalyticsContents>
                    <AnalyticsTotal>
                        <AnalyticsItem>
                            <span>Total Unfulfilled</span>
                            <span>{unfulfilled.total}</span>
                        </AnalyticsItem>
                    </AnalyticsTotal>
                    <AnalyticsItem>
                        <span># to be printed</span>
                        <span>{unfulfilled.toBePrinted}</span>
                    </AnalyticsItem>
                    <AnalyticsItem>
                        <span># with invalid pics</span>
                        <span>{unfulfilled.invalidPics}</span>
                    </AnalyticsItem>
                    <AnalyticsItem>
                        <span># with invalid shopping info</span>
                        <span>{unfulfilled.invalidShippingInfo}</span>
                    </AnalyticsItem>
                    <AnalyticsItem>
                        <span># to be modeled</span>
                        <span>{unfulfilled.toBeModeled}</span>
                    </AnalyticsItem>
                    <AnalyticsItem>
                        <span># to be reviewed and saved</span>
                        <span>{unfulfilled.toBeReviewed}</span>
                    </AnalyticsItem>
                </AnalyticsContents>
            </AnalyticsContainer>
        )
    }
}
