import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from 'aws-amplify';
import { CSVLink } from 'react-csv';

import { StandardButton, StandardInput } from '../../components/StyledComponents';
import {
    BoardBody,
    BoardBodyOptions,
    BoardBodyContainer,
    BoardBodyContentDescriptions,
    BoardBodyContents
} from '../../components/styled/BoardBody';
import { ListComponent } from "../../components/InfiniteLoader";

import userData from '../../reducers/userData';
import { DEFAULT } from '../../actions';
import { adminUser } from '../../config';
import {
    ORDER_REVIEWS_COLUMN_DESCRIPTION,
    ORDER_REVIEWS_COLUMN_PROPERTIES,
    ORDER_REVIEWS_COLUMN_PROPERTIES_TYPE,
    pathName,
    tableName,
    endpoint
} from '../../static/constants/reviewOrders';

class BoardJsx extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            searchValue: '',
            showRemoved: false,
            sortAscending: false
        };

        this.tableStyle = {
            width: '120px',
            marginLeft: '8px',
            display: 'inline-block'
        };
    }

    componentDidMount() {
        this._mounted = true;
        const identityId = this.props.userData ? this.props.userData.identityId : null;
        if (identityId) this.getData(endpoint, tableName);
    }

    componentDidUpdate(prevProps) {
        const prevIdentityId = prevProps.userData ? prevProps.userData.identityId : null;
        const identityId = this.props.userData ? this.props.userData.identityId : null;
        if (prevIdentityId != identityId) {
            this.getData(endpoint, tableName);
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    getData = async () => {
        const userInit = {
            headers: { 'Content-Type': 'application/json' }
        };
        const user = this.props.userData ? this.props.userData.identityId : '';

        try {
            //this is the admin account, photogrammetry
            if (user === adminUser) {
                const response = await API.get(endpoint, pathName, userInit);
                console.log('response: ', response);
                if (response && this._mounted) {
                    const data = [];
                    response.map(item => {
                        const buf = {
                            ...item,
                            reviewStatus: item.reviewStatus ? item.reviewStatus : 'na',
                            reviewSomeAll: item.q2Response,
                            reviewAll: item.q3Response ? item.q3Response : 'na',
                            reviewAllDescription: item.q1Response,
                            f0Q1Response: item.f0Q1Response ? f0Q1Response : 'na',
                            f1Q1Response: item.f1Q1Response ? f1Q1Response : 'na',
                            f2Q1Response: item.f2Q1Response ? f2Q1Response : 'na',
                            f3Q1Response: item.f3Q1Response ? f3Q1Response : 'na',
                            f4Q1Response: item.f4Q1Response ? f4Q1Response : 'na',
                            f5Q1Response: item.f5Q1Response ? f5Q1Response : 'na',
                            f6Q1Response: item.f6Q1Response ? f6Q1Response : 'na',
                            f7Q1Response: item.f7Q1Response ? f7Q1Response : 'na',
                            f8Q1Response: item.f8Q1Response ? f8Q1Response : 'na',
                            f9Q1Response: item.f9Q1Response ? f9Q1Response : 'na',
                            shopifyOrderNumber: item.GroupOrder.shopifyOrderNumber,
                            userId: item.GroupOrder.User.userId,
                            email: item.GroupOrder.User.email
                        };
                        data.push(buf);
                    });

                    this.setState({ data });
                }
            } else {
                let dynamoDBObject = {};
                const response = await API.get('LambdaServer', `/access/${user}`);
                dynamoDBObject = response[0];

                let data = [];
                for (const key of dynamoDBObject) {
                    const value = dynamoDBObject[key];
                    if (key !== user) {
                        const response = await API.get(endpoint, `/${tableName}/read/${value}`, userInit);
                        if (response && this._mounted) {
                            data = [...data, ...response];
                        }
                    }
                }

                this.setState({ data });
            }
        } catch (err) {
            console.log(err);
            throw(err);
        }
    };

    updateSearchBar = searchValue => {
        this.setState({ searchValue });
    };

    sortData = item => {
        const { sortDirection } = this.state;
        const sortNumber = sortDirection ? -1 : 1;
        const newData = [...this.state.data];

        newData.sort((a, b) => {
            if ( a[item] < b[item]){
                return -1 * sortNumber;
            }
            if ( a[item] > b[item] ){
                return 1 * sortNumber;
            }
            return 0;
        });

        this.setState({
            data: newData,
            sortDirection: !sortDirection
        });
    };

    renderVirtualized = (tableProps, table, tablePropsType, tableId) => {
        const { data, showRemoved } = this.state;
        if (!data || !Array.isArray(data) || data.length <= 0) return;

        return ListComponent({
            list: data,
            tableProps,
            table,
            tablePropsType,
            user: this.props.userData.identityId,
            tableId,
            showRemoved,
            toggleVisible: this.toggleVisible
        });
    };

    render() {
        const table = ORDER_REVIEWS_COLUMN_DESCRIPTION;
        const tableProps = ORDER_REVIEWS_COLUMN_PROPERTIES;
        const tablePropsType = ORDER_REVIEWS_COLUMN_PROPERTIES_TYPE;

        const { data, showRemoved, searchValue } = this.state;
        const numAttr = table.length;
        const date = new Date();

        return (
            <BoardBody table={table}>
                <BoardBodyOptions table={table}>
                    <StandardButton
                        ml={3}
                        onClick={() => this.getData()}
                    >
                        Refresh
                    </StandardButton>
                    <StandardButton
                        ml={3}
                        onClick={() => this.setState({ showRemoved: !showRemoved })}
                    >
                        Toggle Removed
                    </StandardButton>
                    <StandardButton ml={3} disabled>Save</StandardButton>
                    <CSVLink data={data} filename={`${tableName}-${date.toString()}.csv`}>
                        <StandardButton ml={3} style={{ textDecoration: 'none' }}>Save CSV</StandardButton>
                    </CSVLink>
                    <StandardInput
                        ml={3}
                        value={searchValue}
                        onChange={(ev) => this.updateSearchBar(ev.target.value.toLowerCase())} />
                </BoardBodyOptions>

                <BoardBodyContainer table={table}>
                    <BoardBodyContentDescriptions table={table}>
                        { table.map((item, i) =>
                            <div
                                key={i}
                                type='display'
                                style={this.tableStyle}
                                onClick={() => this.sortData(tableProps[i])}
                            >
                                {item}
                            </div>
                        )}
                    </BoardBodyContentDescriptions>
                    <BoardBodyContents table={table}>
                        {
                            this.renderVirtualized(tableProps, table, tablePropsType, tableName)
                        }
                    </BoardBodyContents>
                </BoardBodyContainer>
            </BoardBody>
        )
    }
}

const mapStateToProps = state => ({
    userData: userData(state.userData, { type: 'DEFAULT' })
});
export default connect(mapStateToProps)(BoardJsx);
