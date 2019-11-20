import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { API } from 'aws-amplify';
import { ArrowUpward } from '@material-ui/icons';

import BoardBodyOptionsComponent from './BoardBodyOptions';
import Box from '../../../components/Box';
import { ListComponent } from '../../../components/InfiniteLoader';
import { listAdminDynamoDB, updateUserColumn } from '../../../utils/lambdaFunctions';
import {
    BoardBody,
    BoardBodyContainer,
    BoardBodyContentDescriptions,
    BoardBodyContents,
    LoadingContainer
} from '../../../components/styled/BoardBody';
import {
    USERS_COLUMN_DESCRIPTION,
    USERS_COLUMN_PROPERTIES,
    USERS_COLUMN_PROPERTIES_TYPE,
    pathName,
    tableName,
    endpoint
} from '../../../static/constants/users';

import userData from '../../../reducers/userData';
import { DEFAULT } from '../../../actions';
import { adminUser } from "../../../config";

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
            isLoading: true
        };
    }

    componentDidMount() {
        this._mounted = true;
        const identityId = this.props.userData ? this.props.userData.identityId : null;
        if (identityId) this.getData();
    }

    componentDidUpdate(prevProps) {
        const prevIdentityId = prevProps.userData ? prevProps.userData.identityId : null;
        const identityId = this.props.userData ? this.props.userData.identityId : null;
        if (prevIdentityId !== identityId) {
            this.getData();
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    getData = async () => {
        this.setState({
            endpoint,
            tableName,
            data: [],
            isLoading: true
        });

        let userInit = {
            headers: { 'Content-Type': 'application/json' }
        };
        const user = this.props.userData ? this.props.userData.identityId : '';

        const adminList = await listAdminDynamoDB();

        // this is the admin account, photogrammetry
        if (user === adminUser || user === 'us-west-2:95a2f104-1308-42e3-bb65-033c4f9a6de4') {
            try {
                const response = await API.get(endpoint, pathName, userInit);
                if(response && response.rows && this._mounted) {
                    const res = response.rows;
                    const data = [];

                    for (const resItem of res) {
                        const item = {
                            ...resItem,
                            admins: ''
                        };

                        const admins = [];
                        adminList.map((admin, index) => {
                            if (Object.values(admin).indexOf(item.userid) > -1) {
                                admins.push(admin.username);
                            }
                        });
                        item.admins = admins.join(', ');

                        data.push(item);
                    }
                    this.setState({
                        data,
                        isLoading: false
                    });
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            if (tableName !== 'users') return;
            // get the array of ids that this user can see from rds. dynamodb might be good
            // one user id -> many user ids

            var dynamoDBObject = {};
            try {
                const response = await API.get('LambdaServer', `/access/${user}`);
                dynamoDBObject = response[0];
            } catch (err) {
                console.log(err);
            }

            for (const key in dynamoDBObject) {
                const value = dynamoDBObject[key];
                if (key === user) continue;
                let pathName = `/${tableName}/read/${value}`;

                try {
                    const resbuf = await API.get(endpoint, pathName, userInit);
                    if(resbuf && resbuf.rows && this._mounted) {
                        const res = [...this.state.data, ...resbuf.rows];
                        const data = [];

                        for (const resItem of res) {
                            const item = {
                                ...resItem,
                                admins: ''
                            };

                            const admins = [];
                            adminList.map((admin, index) => {
                                if (Object.values(admin).indexOf(item.userid) > -1) {
                                    admins.push(admin.username);
                                }
                            });
                            item.admins = admins.join(', ');

                            data.push(item);
                        }
                        this.setState({
                            data,
                            isLoading: false
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
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

        const newData = [ ...this.state.data ];
        newData.sort((a, b) => {
            if ( a[item] < b[item]){
                return -1 * sortNumber;
            }
            if ( a[item] > b[item] ){
                return ortNumber;
            }
            return 0;

        });
        this.setState({ data: newData, sortDirection: !sortDirection });
    };

    toggleVisible = (tableId, uuid, columnName, columnValue) => {
        if (tableId === 'users') {
            updateUserColumn(uuid, columnName, columnValue);
        }
    };

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
    };

    renderBoardBodyContentDescriptions = (table, tableProps) => {
        const style = {
            width: '120px',
            marginLeft: '10px',
            display: 'inline-block'
        };

        return table.map((item, i) => (
            <Box display='inline-flex' flexDirection='row'>
                {i !== 0 &&
                    <ArrowUpward fontSize='small'/>
                }
                <div key={i} type='display' style={style} onClick={() => this.sortData(tableProps[i])}>{item}</div>
            </Box>
        ))
    };

    render() {
        const table = USERS_COLUMN_DESCRIPTION;
        const tableProps = USERS_COLUMN_PROPERTIES;
        const tablePropsType = USERS_COLUMN_PROPERTIES_TYPE;

        const { data, searchValue, isLoading } = this.state;

        return (
            <React.Fragment>
                {isLoading ? (
                    <LoadingContainer>
                        <ReactLoading type="spinningBubbles" color="#000" />
                    </LoadingContainer>
                ): (
                    <BoardBody table={table}>
                        {/* This should be a component that takes child elements in the form of buttons/input/text */}
                        <BoardBodyOptionsComponent
                            table={table}
                            data={data}
                            searchValue={searchValue}
                            getData={this.getData}
                            toggleRemoved={this.toggleRemoved}
                            updateSearchBar={this.updateSearchBar}
                        />

                        <BoardBodyContainer table={table}>
                            <BoardBodyContentDescriptions table={table} ml='100px'>
                                { this.renderBoardBodyContentDescriptions(table, tableProps) }
                            </BoardBodyContentDescriptions>
                            <BoardBodyContents table={table}>
                                { this.renderVirtualized(tableProps, table, tablePropsType, tableName) }
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
