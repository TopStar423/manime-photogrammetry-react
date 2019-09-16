import styled, { ThemeProvider } from 'styled-components';
import Select from 'react-select';
import { theme } from '../../utils/theme';
import Box from '../../components/Box';
import { StandardButton, StandardInput } from '../../components/StyledComponents';
import { API, Storage } from 'aws-amplify';
import uuid from 'uuid';
import { CSVLink, CSVDownload } from 'react-csv';
import ReactLoading from "react-loading";
import { ListComponent } from '../../components/InfiniteLoader';
import {updateUserColumn, RDSLambda, listAdminDynamoDB} from '../../utils/lambdaFunctions';
import {
    BoardBody,
    BoardBodyOptions,
    BoardBodyContainer,
    BoardBodyContentDescriptions,
    BoardBodyContents,
    AnalyticsContainer,
    AnalyticsHeader,
    AnalyticsContents,
    AnalyticsItem,
    AnalyticsTotal,
    LoadingContainer
} from '../../components/styled/BoardBody';

import { connect } from 'react-redux';
import userData from '../../reducers/userData';
import { DEFAULT } from '../../actions';

const OPEN_PHOTOGRAMMETRY = 'OPEN_PHOTOGRAMMETRY';
const ADD_ADMIN_ACCESS = 'ADD_ADMIN_ACCESS';
const PRODUCTION_COLUMN_DESCRIPTION = ['Order #', 'Order Status', 'Email', 'Full Name', 'Order Date', 'Product', 'Payment', '3D Model', 'Modeler', 'Fit Status', 'Shipping Info', 'Shopify status'];
const PRODUCTION_COLUMN_PROPERTIES = ['orderid', 'orderstatusout', 'email', 'fullname', 'date', 'product', 'payment', '3dmodel', 'adminaccess', 'fitStatus', 'shippingaddress', 'shopifystatus'];
const PRODUCTION_COLUMN_PROPERTIES_TYPE = ['modal', 'menu', 'text', 'text', 'time', 'modal', 'text', OPEN_PHOTOGRAMMETRY, ADD_ADMIN_ACCESS, 'text', 'text', 'text'];

let pathName = '/orders/production/read';
const tableName = 'orders';
const endpoint = 'RDSLambda';

const orderStatusOptions = [
    { value: 'allstatus', label: 'Status' },
    { value: 'invalidshippinginfo', label: 'Invalid Shipping Info' },
    { value: 'invalidpictures', label: 'Invalid Pictures' },
    { value: 'tobemodeled', label: 'To Be Modeled' },
    { value: 'tobereviewed', label: 'To Be Reviewed' },
    { value: 'tobeprinted', label: 'To Be Printed' }
]

class BoardJsx extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            numColumns: 0,
            endpoint: '',
            searchValue: '',
            showRemoved: false,
            sortAscending: false,
            isLoading: false
        };

        this.orderSelectOptionStyle = {
            container: () => ({
                width: '90%',
                position: 'relative',
            }),
            singleValue: () => ({
                color: '#000',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }),
            valueContainer: () => ({
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'nowrap',
                width: '80%'
            }),
            control: () => ({
                border: 'none',
                display: 'flex'
            }),
            indicatorSeparator: () => ({
                display: 'none'
            })
        }

        this.handleOrderStatusSelect = this.handleOrderStatusSelect.bind(this);
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
            data: [],
            filteredData: [],
            unfulfilled: {
                total: 0,
                toBePrinted: 0,
                invalidPics: 0,
                invalidShippingInfo: 0,
                toBeModeled: 0,
                toBeReviewed: 0
            },
            adminList,
            selectedOrderStatus: orderStatusOptions[0],
            isLoading: true
        });

        let userInit = {
            headers: { 'Content-Type': 'application/json' }
        }
        const user = this.props.userData ? this.props.userData.identityId : '';

        const adminList = await listAdminDynamoDB();

        // this is the admin account, photogrammetry
        if (user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea') {
            try {
                const response = await RDSLambda('get', pathName);
                const data = [];
                if(response && this._mounted) {
                    const unfulfilled = {
                        total: 0,
                        toBePrinted: 0,
                        invalidPics: 0,
                        invalidShippingInfo: 0,
                        toBeModeled: 0,
                        toBeReviewed: 0,
                    };
                    for (const resItem of response) {
                        const dateCreated = new Date(resItem.GroupOrder.dateCreated);
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

                        const now = new Date();
                        const timeDiff = now.getTime() - dateCreated.getTime();

                        const item = {
                            orderid: resItem.orderId,
                            email: resItem.GroupOrder.User.email,
                            fullname: resItem.GroupOrder.User.firstName + ' ' + resItem.GroupOrder.User.lastName,
                            date: date,
                            dateTime: dateCreated.getTime(),
                            payment: '$' + resItem.GroupOrder.orderTotal,
                            shippingaddress: resItem.GroupOrder.shippingAddress,
                            ...resItem.GroupOrder.User,
                            orderstatusout: '',
                            orderstatusValue: '',
                            fulfillmentStatus: 'unfulfilled',
                            admins: '',
                            bgColor: timeDiff > (1000*60*60*24) ? '#fbc1c1' : 'transparent'
                        };

                        if (!item.shippingaddress || item.shippingaddress.length === 0) {
                            unfulfilled.invalidShippingInfo++;
                            item.orderstatusout = 'Invalid Shipping Info';
                            item.orderstatusValue = 'invalidshippinginfo';
                        } else if (!item.statusLeftFingers || !item.statusLeftThumb || !item.statusRightFingers || !item.statusRightThumb || !item.statusSide) {
                            unfulfilled.invalidPics++;
                            item.orderstatusout = 'Invalid pictures';
                            item.orderstatusValue = 'invalidpictures';
                        } else if (!item.fitStatus !== 'fittingValidated' || ! item.fitStatus !== 'fittedByDesigner') {
                            unfulfilled.toBeModeled++;
                            item.orderstatusout = 'To be modeled';
                            item.orderstatusValue = 'tobemodeled';
                        } else if(item.fitStatus !== 'fittedByDesigner') {
                            unfulfilled.toBeReviewed++;
                            item.orderstatusout = 'To be reviewed';
                            item.orderstatusValue = 'tobereviewed';
                        } else if(item.fitStatus !== 'fittingValidated') {
                            unfulfilled.toBePrinted++;
                            item.orderstatusout = 'To be printed';
                            item.orderstatusValue = 'tobeprinted';
                        } else {
                            item.fulfillmentStatus = 'fulfilled';
                        }

                        const admins = [];
                        adminList.map((admin, index) => {
                            if (Object.values(admin).indexOf(item.userId) > -1) {
                                admins.push(admin.username);
                            }
                        });
                        item.admins = admins.join(', ');

                        if (item.fulfillmentStatus !== 'fulfilled') {
                            data.push(item);
                        }
                    }

                    unfulfilled.total = unfulfilled.toBePrinted + unfulfilled.invalidPics + unfulfilled.invalidShippingInfo + unfulfilled.toBeModeled + unfulfilled.toBeReviewed
                    data.sort((data1, data2) => {
                        return data2.dateTime - data1.dateTime
                    });

                    this.setState({
                        data,
                        filteredData: data,
                        unfulfilled,
                        isLoading: false
                    });
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

    handleOrderStatusSelect = selectedOrderStatus => {
        const { data } = this.state;
        let filteredData = [];

        if (selectedOrderStatus.value === this.state.selectedOrderStatus) {
            return;
        }

        if (selectedOrderStatus.value === 'allstatus') {
            filteredData = data;
        } else {
            filteredData = data.filter(item => item.orderstatusValue === selectedOrderStatus.value)
        }

        this.setState({
            selectedOrderStatus,
            filteredData
        });
    };

    renderVirtualized = (tableProps, table, tablePropsType, tableId) => {
        if (!this.state.filteredData || !Array.isArray(this.state.filteredData) || this.state.filteredData.length <= 0) return;

        return ListComponent({
            list: this.state.filteredData,
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

        const { data, unfulfilled, adminList, selectedOrderStatus, isLoading } = this.state;
        const numAttr = table.length;
        const date = new Date();

        return (
            <React.Fragment>
                {isLoading ? (
                    <LoadingContainer>
                        <ReactLoading type="spinningBubbles" color="#000" />
                    </LoadingContainer>
                ) : (
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
                            {unfulfilled &&
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
                            }
                            <BoardBodyContentDescriptions table={table}>
                                { table.map((item, i) => {
                                    if (item === 'Order Status') {
                                        return (
                                            <div style={{ width: '200px', marginLeft: '10px', display: 'inline-block', fontWeight: 700 }}>
                                                <Select
                                                    value={selectedOrderStatus}
                                                    onChange={this.handleOrderStatusSelect}
                                                    options={orderStatusOptions}
                                                    styles={this.orderSelectOptionStyle}
                                                />
                                            </div>
                                        )
                                    } else {
                                        return <div key={i} type='display' style={{ width: '200px', marginLeft: '10px', display: 'inline-block', fontWeight: 700 }} onClick={() => this.sortData(tableProps[i])}>{item}</div>
                                    }
                                }) }
                            </BoardBodyContentDescriptions>
                            <BoardBodyContents table={table}>
                                {
                                    this.renderVirtualized(tableProps, table, tablePropsType, tableName)
                                }
                            </BoardBodyContents>
                        </BoardBodyContainer>


                    </BoardBody>
                )}
            </React.Fragment>
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
