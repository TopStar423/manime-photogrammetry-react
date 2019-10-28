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
            marginLeft: '10px',
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
                if (response && response.rows && this._mounted) {
                    this.setState({ data: response.rows });
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
                        if (response && response.rows && this._mounted) {
                            data = [...data, ...response.row];
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
