import { connect } from 'react-redux';
import Select from 'react-select';
import ReactLoading from "react-loading";
import { API } from 'aws-amplify';

import BoardBodyOptionsComponent from './BoardBodyOptions';
import Analytics from './Analytics';
import { ListComponent } from '../../../components/InfiniteLoader';
import { updateUserColumn, RDSLambda, listAdminDynamoDB } from '../../../utils/lambdaFunctions';
import {
    BoardBody,
    BoardBodyContainer,
    BoardBodyContentDescriptions,
    BoardBodyContents,
    LoadingContainer
} from '../../../components/styled/BoardBody';
import {
    PRODUCTION_COLUMN_DESCRIPTION,
    PRODUCTION_COLUMN_PROPERTIES,
    PRODUCTION_COLUMN_PROPERTIES_TYPE,
    pathName,
    tableName,
    endpoint,
    orderStatusOptions
} from '../../../static/constants/production';

import { adminUser } from '../../../config';
import userData from '../../../reducers/userData';
import { DEFAULT } from '../../../actions';

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
        };

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
            selectedOrderStatus: orderStatusOptions[0],
            isLoading: true
        });

        let userInit = {
            headers: { 'Content-Type': 'application/json' }
        };
        const user = this.props.userData ? this.props.userData.identityId : '';

        const adminList = await listAdminDynamoDB();

        // this is the admin account, photogrammetry
        if (user === adminUser) {
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
                            orderid: resItem.GroupOrder.groupOrderId,
                            email: resItem.GroupOrder.User.email,
                            fullname: resItem.GroupOrder.User.firstName + ' ' + resItem.GroupOrder.User.lastName,
                            date: date,
                            dateTime: dateCreated.getTime(),
                            product: resItem.shopifySku,
                            payment: '$' + resItem.GroupOrder.orderTotal,
                            shippingaddress: resItem.GroupOrder.shippingAddress,
                            shopifyordernumber: resItem.GroupOrder.shopifyOrderNumber,
                            ...resItem.GroupOrder.User,
                            userid: resItem.GroupOrder.userid,
                            orderstatusout: '',
                            orderstatusValue: '',
                            fulfillmentStatus: resItem.fulfillmentStatus,
                            admins: '',
                            bgColor: timeDiff > (1000*60*60*24) ? '#fbc1c1' : 'transparent'
                        };

                        if (!item.shippingaddress || item.shippingaddress.length === 0) {
                            unfulfilled.invalidShippingInfo++;
                            item.orderstatusout = 'Invalid Shipping Info';
                            item.orderstatusValue = 'invalidshippinginfo';
                        } else if(item.fitStatus === 'fittedByDesigner') {
                            unfulfilled.toBeReviewed++;
                            item.orderstatusout = 'To be reviewed';
                            item.orderstatusValue = 'tobereviewed';
                        } else if(item.fitStatus === 'fittingValidated') {
                            unfulfilled.toBePrinted++;
                            item.orderstatusout = 'To be printed';
                            item.orderstatusValue = 'tobeprinted';
                        } else if (!item.statusLeftFingers || !item.statusLeftThumb || !item.statusRightFingers || !item.statusRightThumb || !item.statusSide) {
                            unfulfilled.invalidPics++;
                            item.orderstatusout = 'Invalid pictures';
                            item.orderstatusValue = 'invalidpictures';
                        } else {
                            unfulfilled.toBeModeled++;
                            item.orderstatusout = 'To be modeled';
                            item.orderstatusValue = 'tobemodeled';
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
                        this.setState({
                            data: [...this.state.data, ...response],
                            isLoading: false
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };

    updateSearchBar = (searchValue) => {
        this.setState({ searchValue });
    };

    sortData = item => {
        const sortDirection = this.state.sortDirection;
        let sortNumber = 1;
        if (sortDirection) sortNumber = -1;

        const newData = [ ...this.state.filteredData ];
        newData.sort((a, b) => {
            if ( a[item] < b[item]){
                return -1 * sortNumber;
            }
            if ( a[item] > b[item] ){
                return 1 * sortNumber;
            }
            return 0;

        });
        this.setState({ filteredData: newData, sortDirection: !sortDirection });
    };



    toggleVisible = (tableId, uuid, columnName, columnValue) => {
        if (tableId == 'users') {
            updateUserColumn(uuid, columnName, columnValue);
        }
    };

    updateListAdminData = (userid, admins) => {
        const { filteredData } = this.state;
        for (const item of filteredData) {
            if (item.userid === userid) {
                item.admins = admins;
            }
        }
        this.setState({ filteredData });
    };

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
            toggleVisible: this.toggleVisible,
            updateListAdminData: this.updateListAdminData
        });
    };

    renderBoardBodyContentDescriptions = (table, tableProps) => {
        const { selectedOrderStatus } = this.state;
        const generalStyle = {
            width: '120px',
            marginLeft: '10px',
            display: 'inline-block',
            fontWeight: 700
        };
        const orderStatusStyle = {
            width: '160px',
            marginLeft: '10px',
            display: 'inline-block',
            fontWeight: 700
        };

        return table.map((item, i) => {
            if (item === 'Order Status') {
                return (
                    <div style={orderStatusStyle}>
                        <Select
                            value={selectedOrderStatus}
                            onChange={this.handleOrderStatusSelect}
                            options={orderStatusOptions}
                            styles={this.orderSelectOptionStyle}
                        />
                    </div>
                )
            } else {
                return (
                    <div
                        key={i}
                        type='display'
                        style={generalStyle}
                        onClick={() => this.sortData(tableProps[i])}>
                        {item}
                    </div>
                )
            }
        })
    };

    render() {
        const table = PRODUCTION_COLUMN_DESCRIPTION;
        const tableProps = PRODUCTION_COLUMN_PROPERTIES;
        const tablePropsType = PRODUCTION_COLUMN_PROPERTIES_TYPE;

        const { data, unfulfilled, searchValue, isLoading } = this.state;

        return (
            <React.Fragment>
                {isLoading ? (
                    <LoadingContainer>
                        <ReactLoading type="spinningBubbles" color="#000" />
                    </LoadingContainer>
                ) : (
                    <BoardBody table={table}>
                        <BoardBodyOptionsComponent
                            data={data}
                            table={table}
                            searchValue={searchValue}
                            getData={this.getData}
                            updateSearchBar={this.updateSearchBar}
                        />

                        <BoardBodyContainer table={table}>
                            {unfulfilled &&
                                <Analytics unfulfilled={unfulfilled} />
                            }
                            <BoardBodyContentDescriptions table={table}>
                                { this.renderBoardBodyContentDescriptions(table, tableProps) }
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
});

export default connect(
    mapStateToProps,
    null,
)(BoardJsx);
