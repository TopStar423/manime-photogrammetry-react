import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../utils/theme';
import Box from '../../components/Box';
import { StandardButton, StandardInput } from '../../components/StyledComponents';
import { API, Storage } from 'aws-amplify';
import uuid from 'uuid';
import { CSVLink, CSVDownload } from 'react-csv';
import { ListComponent } from '../../components/InfiniteLoader';
import { updateUserColumn, RDSLambda } from '../../utils/lambdaFunctions';
import {
    BoardBody,
    BoardBodyOptions,
    BoardBodyContainer,
    BoardBodyContentDescriptions,
    BoardBodyContents,
    AnalyticsContainer,
    AnalyticsHeader,
    AnalyticsContents,
    AnalyticsItem
} from '../../components/styled/BoardBody';

import { connect } from 'react-redux';
import userData from '../../reducers/userData';
import { DEFAULT } from '../../actions';

const OPEN_PHOTOGRAMMETRY = 'OPEN_PHOTOGRAMMETRY';
const ADD_ADMIN_ACCESS = 'ADD_ADMIN_ACCESS';
const PRODUCTION_COLUMN_DESCRIPTION = ['Order #', 'Order Status', 'Email', 'Full Name', 'Order Date', 'Product', 'Payment', '3D Model', 'Modeler', 'Fit Status', 'Shipping Info', 'Shopify status'];
const PRODUCTION_COLUMN_PROPERTIES = ['orderid', 'orderstatus', 'email', 'fullname', 'date', 'product', 'payment', '3dmodel', 'adminaccess', 'fitstatus', 'shippingaddress', 'shopifystatus'];
const PRODUCTION_COLUMN_PROPERTIES_TYPE = ['modal', 'menu', 'text', 'text', 'time', 'modal', 'text', OPEN_PHOTOGRAMMETRY, ADD_ADMIN_ACCESS, 'text', 'text', 'text'];

let pathName = '/orders/production/read';
const tableName = 'orders';
const endpoint = 'RDSLambda';

let userPathName = '/users/cms/read';
let userTableName = 'users';

class BoardJsx extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            numColumns: 0,
            endpoint: '',
            searchValue: '',
            showRemoved: false,
            sortAscending: false
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

    getData = async (endpoint, tableName) => {
        this.setState({
            endpoint,
            tableName,
            data: []
        });

        let userInit = {
            headers: { 'Content-Type': 'application/json' }
        }
        const user = this.props.userData ? this.props.userData.identityId : '';
        // this is the admin account, photogrammetry
        if (user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea') {
            try {
                const response = await RDSLambda('get', pathName);
                const data = [];
                if(response && this._mounted) {
                    console.log('res: ', response);
                    for (const resItem of response) {
                        const dateCreated = new Date(resItem.dateCreated);
                        let dd = dateCreated.getDate();
                        let mm = dateCreated.getMonth() + 1;
                        const yyyy = dateCreated.getFullYear();
                        if (dd < 10) {
                            dd = '0' + dd;
                        }
                        if (mm < 10) {
                            mm = '0' + mm;
                        }
                        const date = yyyy + '/' + mm + '/' + dd;

                        const item = {
                            orderid: resItem.orderId,
                            email: resItem.GroupOrder.User.email,
                            fullname: resItem.GroupOrder.User.firstName + ' ' + resItem.GroupOrder.User.lastName,
                            date: date,
                            payment: '$' + resItem.GroupOrder.orderTotal,
                            shippingaddress: resItem.GroupOrder.shippingAddress,
                            ...resItem.GroupOrder.User,
                        }
                        data.push(item);
                    }
                    this.setState({ data: data });
                }
            } catch (err) {
                console.log('error: ', err);
                // console.log(err.stack);
            }
        } else {
            if (tableName != 'users') return;
            // get the array of ids that this user can see from rds. dynamodb might be good
            // one user id -> many user ids

            var dynamoDBObject = {};
            await API.get('LambdaServer', `/access/${user}`).then(response => {
                dynamoDBObject = response[0];
            }).catch((err) => {
                console.log(err);
            });

            for (const key in dynamoDBObject) {
                const value = dynamoDBObject[key];
                if (key == user) continue;
                pathName = `/${tableName}/read/${value}`;

                API.get(endpoint, pathName, userInit).then(response => {
                    if(response && this._mounted) {
                        this.setState({ data: [...this.state.data, ...response] });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }

    updateSearchBar = (searchValue) => {
        this.setState({ searchValue });
    }

    sortData = item => {
        const sortDirection = this.state.sortDirection;
        let sortNumber = 1;
        if (sortDirection) sortNumber = -1;

        const newData = [ ...this.state.data ];
        newData.sort((a, b) => {
            if ( a[item] < b[item]){
                return -1 * sortNumber;
            }
            if ( a[item] > b[item] ){
                return 1 * sortNumber;
            }
            return 0;

        });
        this.setState({ data: newData, sortDirection: !sortDirection });
    }



    toggleVisible = (tableId, uuid, columnName, columnValue) => {
        if (tableId == 'users') {
            updateUserColumn(uuid, columnName, columnValue);
        }
    }

    renderVirtualized = (tableProps, table, tablePropsType, tableId) => {
        if (!this.state.data || !Array.isArray(this.state.data) || this.state.data.length <= 0) return;

        return ListComponent({
            list: this.state.data,
            tableProps,
            table,
            tablePropsType,
            user: this.props.userData.identityId,
            tableId,
            showRemoved: this.state.showRemoved,
            toggleVisible: this.toggleVisible
        });
    }

    render() {
        const table = PRODUCTION_COLUMN_DESCRIPTION;
        const tableProps = PRODUCTION_COLUMN_PROPERTIES;
        const tablePropsType = PRODUCTION_COLUMN_PROPERTIES_TYPE;

        const data = this.state.data;
        const numAttr = table.length;
        const date = new Date();

        return (
            <BoardBody table={table}>
                {/* This should be a component that takes child elements in the form of buttons/input/text */}
                <BoardBodyOptions table={table}>
                    <StandardButton ml={3} onClick={() => this.getData(endpoint, tableName)}>Refresh</StandardButton>
                    <CSVLink data={data} filename={`${tableName}-${date.toString()}.csv`} style={{ textDecoration:  'none' }}>
                        <StandardButton ml={3}>Save CSV</StandardButton>
                    </CSVLink>
                    <StandardInput ml={3} value={this.state.searchValue} onChange={(ev) => this.updateSearchBar(ev.target.value.toLowerCase())}></StandardInput>
                </BoardBodyOptions>

                <BoardBodyContainer table={table}>
                    <AnalyticsContainer>
                        <AnalyticsHeader>Unfulfilled orders tracker</AnalyticsHeader>
                        <AnalyticsContents>
                            <AnalyticsItem>
                                <span>Total Unfulfilled</span>
                                <span>33</span>
                            </AnalyticsItem>
                            <AnalyticsItem>
                                <span># to be printed</span>
                                <span>33</span>
                            </AnalyticsItem>
                            <AnalyticsItem>
                                <span># with invalid pics</span>
                                <span>33</span>
                            </AnalyticsItem>
                            <AnalyticsItem>
                                <span># with invalid shopping info</span>
                                <span>33</span>
                            </AnalyticsItem>
                            <AnalyticsItem>
                                <span># to be modelled</span>
                                <span>33</span>
                            </AnalyticsItem>
                            <AnalyticsItem>
                                <span># to be reviewed and saved</span>
                                <span>33</span>
                            </AnalyticsItem>
                        </AnalyticsContents>
                    </AnalyticsContainer>
                    <BoardBodyContentDescriptions table={table}>
                        { table.map((item, i) => <div key={i} type='display' style={{ width: '200px', marginLeft: '10px', display: 'inline-block' }} onClick={() => this.sortData(tableProps[i])}>{item}</div>) }
                    </BoardBodyContentDescriptions>
                    <BoardBodyContents table={table}>
                        {
                            this.renderVirtualized(tableProps, table, tablePropsType, tableName)
                        }
                    </BoardBodyContents>
                </BoardBodyContainer>


            </BoardBody>
        );
    }
};

const mapStateToProps = state => ({
    userData: userData(state.userData, { type: 'DEFAULT' })
})

export default connect(
    mapStateToProps,
    null,
)(BoardJsx);
