import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../utils/theme';
import Box from '../../components/Box';
import { StandardButton, StandardInput } from '../../components/StyledComponents';
import UserAccess from '../../components/UserAccess';
import { API, Storage } from 'aws-amplify';
import uuid from 'uuid';
import { CSVLink, CSVDownload } from 'react-csv';
import { InfiniteLoaderComponent, ListComponent } from '../../components/InfiniteLoader';
import Portal from '../../components/Portal';
import { queryAdminDynamoDB, listAdminDynamoDB, addAttributeAdminDynamoDB, deleteAttributeAdminDynamoDB, updateUserColumn, RDSLambda } from '../../utils/lambdaFunctions';

import { connect } from 'react-redux';
import userData from '../../reducers/userData';
import { DEFAULT } from '../../actions';

const COMBINED_ORDERS_COLUMN_DESCRIPTION = ['_Email', 'Nail Description', 'Shipping Address', 'User ID', 'Order ID', 'Group Order ID', 'Nail Product ID', 'Nail Length', 'Nail Shape', 'Order Status', 'Date Created'];
const COMBINED_ORDERS_COLUMN_PROPERTIES = ['email', 'description', 'shippingaddress', 'userid', 'orderid', 'grouporderid', 'nailproductid', 'naillength', 'nailshape', 'orderstatus', 'datecreated'];
const COMBINED_ORDERS_COLUMN_PROPERTIES_TYPE = ['text', 'text', 'text', 'modal', 'modal', 'modal', 'modal', 'text', 'text', 'menu', 'time'];

const pathName = '/orders/cms/read/combined';
const tableName = 'combinedorders';
const endpoint = 'LambdaRDSClient';

const MX_ROW = 3;
const ML_ROW_ITEM = 2;
const ROW_ITEM_WIDTH = 220;

const BoardBody = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  overflow-x: auto;
  background-color: #fafafa;
`;

// BoardBodyContents needs table prop
const BoardBodyContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
  width: ${(props) => {
    const numColumns = props.table.length;
    const width = (props.theme.space[MX_ROW] * 2) + ((props.theme.space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns);
    return width;
  }}px;
  background-color: transparent;
`;

const BoardBodyContents = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  height: 1px;
  min-height: 1px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
`;

class BoardJsx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      numColumns: 0,
      selectedField: -1,
      selectedFieldType: 'display',
      selectedBoundingRect: {},
      endpoint: '',
      tableName: '',
      searchValue: '',
      showRemoved: false
    };
  }

  componentDidMount() {
    this._mounted = true;
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
      API.get(endpoint, pathName, userInit).then(response => {
        if(response && response.rows && this._mounted) {
          this.setState({ data: response.rows });
          // console.log(response.rows)
        }
      }).catch((err) => {
        // console.log(err.stack);
      });
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
          if(response && response.rows && this._mounted) {
            this.setState({ data: [...this.state.data, ...response.rows] });
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }

  // createRow = () => {
  //   if (this.props.id == 'nailproducts') {
  //     let userData = {
  //       nailproductid: uuid.v1(),
  //     }
  //     let userInit = {
  //         body: userData,
  //         headers: { 'Content-Type': 'application/json' }
  //     }
  //     API.post(this.state.endpoint, '/nailproducts/create', userInit).then(response => {
  //         console.log(response);
  //     }).catch(error => {
  //         console.log(error.stack);
  //     });
  //   }
  // }

  // updateField = (id, propertyName, propertyValue) => {
  //   // LAMBDA
  //   if (this.props.id == 'nailproducts') {
  //     let userData = {
  //       nailproductid: id,
  //       columnname: propertyName,
  //       columnvalue: propertyValue
  //     }
  //     let userInit = {
  //         body: userData,
  //         headers: { 'Content-Type': 'application/json' }
  //     }
  //     API.post(this.state.endpoint, '/nailproducts/update/column', userInit).then(response => {
  //         console.log(response);
  //     }).catch(error => {
  //         console.log(error.stack);
  //     });
  //   }
  // }

  updateSearchBar = (searchValue) => {
    this.setState({ searchValue });
  }

  sortData = item => {
    const newData = [ ...this.state.data ];
    newData.sort((a, b) => {
      if ( a[item] < b[item]){
        return -1;
      }
      if ( a[item] > b[item] ){
        return 1;
      }
      return 0;

    });
    this.setState({ data: newData });
  }



  toggleVisible = (tableId, uuid, columnName, columnValue) => {
    if (tableId == 'users') {
      updateUserColumn(uuid, columnName, columnValue);
      // // change state
      // let newData = [ ...this.state.data ];
      // const index = newData.findIndex(item => {
      //   return item.userid == 'us-west-2:c6b83d25-a47b-476b-8aa9-0f63f83d2f9e';
      // });
      // let visible = newData[index]['visible'];
      // newData[index] = { ...newData[index], visible: !visible };
      // this.setState({ data: newData });
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
    const table = COMBINED_ORDERS_COLUMN_DESCRIPTION;
    const tableProps = COMBINED_ORDERS_COLUMN_PROPERTIES;
    const tablePropsType = COMBINED_ORDERS_COLUMN_PROPERTIES_TYPE;

    const data = this.state.data;
    const numAttr = table.length;
    const date = new Date();

    return (
      <BoardBody width={1}>

        {/* This should be a component that takes child elements in the form of buttons/input/text */}
        <Box display='flex' flexDirection='row' width='100%' pt={3} pb={2}>
          <StandardButton ml={3} onClick={() => this.getData(this.state.endpoint, this.state.tableName)}>Refresh</StandardButton>
          {this.props.id === 'nailproducts' && <Portal buttonText={"New"} type={"AddNailProductModal"} />}
          {/* <StandardButton ml={3} onClick={this.createRow} disabled={this.props.id == 'nailproducts' ? false : true}>New</StandardButton> */}
          <StandardButton ml={3} onClick={() => this.setState({ showRemoved: !this.state.showRemoved })}>Toggle Removed</StandardButton>
          <StandardButton ml={3} disabled>Save</StandardButton>
          <CSVLink data={data} filename={`${this.props.id}-${date.toString()}.csv`}>
            <StandardButton ml={3} style={{ textDecoration: 'none' }}>Save CSV</StandardButton>
          </CSVLink>
          {this.props.id === 'nailproductstocategory' && <Portal buttonText={"Open Nail Product Category Modal"} type={"NailProductCategoryModal"} />}
          <StandardInput ml={3} value={this.state.searchValue} onChange={(ev) => this.updateSearchBar(ev.target.value.toLowerCase())}></StandardInput>
        </Box>


        <BoardBodyContainer table={table}>
          <div>
            { table.map((item, i) => <div key={i} type='display' style={{ width: '200px', marginLeft: '10px', display: 'inline-block' }} onClick={() => this.sortData(tableProps[i])}>{item}</div>) }
          </div>
          <BoardBodyContents>
            {
              this.renderVirtualized(tableProps, table, tablePropsType, this.props.id)
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
