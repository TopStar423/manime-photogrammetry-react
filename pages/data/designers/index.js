import { connect } from 'react-redux';
import { API } from 'aws-amplify';

import BoardBodyOptionsComponent from './BoardBodyOptions';
import { ListComponent } from '../../../components/InfiniteLoader';
import { updateUserColumn } from '../../../utils/lambdaFunctions';
import { BoardBody, BoardBodyContainer, BoardBodyContentDescriptions, BoardBodyContents } from '../../../components/styled/BoardBody';
import {
    DESIGNERS_COLUMN_DESCRIPTION,
    DESIGNERS_COLUMN_PROPERTIES,
    DESIGNERS_COLUMN_PROPERTIES_TYPE,
    pathName,
    tableName,
    endpoint
} from '../../../static/constants/designers';

import userData from '../../../reducers/userData';
import { DEFAULT } from '../../../actions';
import { adminUser } from '../../../config';

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
            data: []
        });

        let userInit = {
            headers: { 'Content-Type': 'application/json' }
        };
        const user = this.props.userData ? this.props.userData.identityId : '';
        // this is the admin account, photogrammetry
        if (user !== adminUser) {
            try {
                const response = await API.get(endpoint, pathName, userInit);
                if(response && response.rows && this._mounted) {
                    this.setState({ data: response.rows });
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
                pathName = `/${tableName}/read/${value}`;

                try {
                    const res = await API.get(endpoint, pathName, userInit);
                    if(res && res.rows && this._mounted) {
                        this.setState({ data: [...this.state.data, ...res.rows] });
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
                return 1 * sortNumber;
            }
            return 0;

        });
        this.setState({ data: newData, sortDirection: !sortDirection });
    };

    toggleVisible = (tableId, uuid, columnName, columnValue) => {
        if (tableId == 'users') {
            updateUserColumn(uuid, columnName, columnValue);
        }
    };

    toggleRemoved = () => {
        const { showRemoved } = this.state;
        this.setState({ showRemoved: !showRemoved });
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

        return table.map((item, i) =>
            <div
                key={i}
                type='display'
                style={style}
                onClick={() => this.sortData(tableProps[i])}>
                {item}
            </div>
        )
    };

    render() {
        const table = DESIGNERS_COLUMN_DESCRIPTION;
        const tableProps = DESIGNERS_COLUMN_PROPERTIES;
        const tablePropsType = DESIGNERS_COLUMN_PROPERTIES_TYPE;

        const { data, searchValue } = this.state;

        return (
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
                    <BoardBodyContentDescriptions table={table}>
                        { this.renderBoardBodyContentDescriptions(table, tableProps) }
                    </BoardBodyContentDescriptions>
                    <BoardBodyContents table={table}>
                        { this.renderVirtualized(tableProps, table, tablePropsType, tableName) }
                    </BoardBodyContents>
                </BoardBodyContainer>
            </BoardBody>
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
