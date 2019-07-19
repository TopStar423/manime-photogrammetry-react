import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';
import Box from './Box';
import { StandardButton, StandardInput } from './StyledComponents';
import UserAccess from './UserAccess';
import { API, Storage } from 'aws-amplify';
import uuid from 'uuid';
import { CSVLink, CSVDownload } from 'react-csv';
import { InfiniteLoaderComponent, ListComponent } from './InfiniteLoader';
import Portal from './Portal';
import { List } from 'immutable';
import { queryAdminDynamoDB, listAdminDynamoDB, addAttributeAdminDynamoDB, deleteAttributeAdminDynamoDB, updateUserColumn, RDSLambda } from '../utils/lambdaFunctions';

import { connect } from 'react-redux';
import userData from '../reducers/userData';
import { DEFAULT } from '../actions';

const OPEN_PHOTOGRAMMETRY = 'OPEN_PHOTOGRAMMETRY';

const COMBINED_ORDERS_COLUMN_DESCRIPTION = ['_Email', 'Nail Description', 'Shipping Address', 'User ID', 'Order ID', 'Group Order ID', 'Nail Product ID', 'Nail Length', 'Nail Shape', 'Order Status', 'Date Created'];
const ORDERS_COLUMN_DESCRIPTION = ['_Email', 'Order ID', 'Group Order ID', 'Nail Product ID', 'Nail Length', 'Nail Shape', 'Order Status', 'Date Created'];
const GROUP_ORDERS_COLUMN_DESCRIPTION = ['', 'Group Order ID', 'User ID', 'Group Order Status', 'Insurance', 'Shipping Address', 'Subtotal', 'Taxes'];
const USERS_COLUMN_DESCRIPTION = ['', 'User ID', 'First Name', 'Last Name', 'Email', '# Pics', 'Fit Status', 'Total Orders', 'Fitted (Deprecated)', 'Date Created', 'Date Last Login', 'Description', 'Subscription', 'Design Pref 1', 'Design Pref 2', 'Design Pref 3'];
const ORDER_REVIEWS_COLUMN_DESCRIPTION = ['Review ID', 'Order ID', 'Finger Name', 'Review Description', 'Category 1', 'Category 2', 'Category 3'];
const SHIPPING_ADDRESSES_COLUMN_DESCRIPTION = ['Shipping Address ID', 'User ID', 'Name', 'Address Line 1', 'Address Line 2', 'City', 'Zip Code', 'State', 'Country', 'Latitude', 'Longitude'];
const PAYMENTS_COLUMN_DESCRIPTION = ['Payment ID', 'User ID', 'Name', 'Last 4', 'Refunded', 'Paid', 'Address Line 1', 'Address Line 2', 'City', 'Zip Code', 'State', 'Country'];
const DESIGNERS_COLUMN_DESCRIPTION = ['Designer ID', 'First Name', 'Last Name', 'Total Reviews', 'Total Designs', 'Profile Picture', 'Description', 'Location', 'Url 1', 'Url 2', 'Url 3', 'Url 4', 'Url 5', 'Url 6'];
const NAIL_PRODUCTS_COLUMN_DESCRIPTION = ['Preview', 'Nail Product ID', 'Index','Date Created', 'Description', 'Designer ID', 'Name', 'Price', 'Total Hates', 'Total Likes', 'Total Manime', 'Total Purchases', 'Visible', 'Pic Url 1', 'Pic Url 2', 'Pic Url 3', 'Pic Url 4', 'Pic Url 5', 'Overlay Url', 'Version'];
const NAIL_CATEGORIES_COLUMN_DESCRIPTION = ['Category ID', 'Category Name'];
const NAIL_PRODUCT_CATEGORIES_COLUMN_DESCRIPTION = ['Nail Product ID', 'Category ID'];

const COMBINED_ORDERS_COLUMN_PROPERTIES = ['email', 'description', 'shippingaddress', 'userid', 'orderid', 'grouporderid', 'nailproductid', 'naillength', 'nailshape', 'orderstatus', 'datecreated'];
const ORDERS_COLUMN_PROPERTIES = ['email', 'orderid', 'grouporderid', 'nailproductid', 'naillength', 'nailshape', 'orderstatus', 'datecreated'];
const GROUP_ORDERS_COLUMN_PROPERTIES = ['userid', 'grouporderid', 'userid', 'grouporderstatus', 'insurance', 'shippingaddress', 'subtotal', 'taxes'];
const USERS_COLUMN_PROPERTIES = ['userid', 'userid', 'firstname', 'lastname', 'email', 'numpics', 'fitstatus','totalorders', 'fitted', 'datecreated', 'datelastlogin', 'description', 'subscription', 'designpref', 'designpref2', 'designpref3'];
const ORDER_REVIEWS_COLUMN_PROPERTIES = ['reviewid', 'orderid', 'fingername', 'reviewdescription', 'category1', 'category2', 'category3'];
const SHIPPING_ADDRESSES_COLUMN_PROPERTIES = ['shippingaddressid', 'userid', 'name', 'addressline1', 'addressline2', 'city', 'addresszip', 'addresstate', 'addresscountry', 'addresslatitude', 'addresslongitude'];
const PAYMENTS_COLUMN_PROPERTIES = ['paymentid'];
const DESIGNERS_COLUMN_PROPERTIES = ['designerid'];
const NAIL_PRODUCTS_COLUMN_PROPERTIES = ['picuri1', 'nailproductid', 'index', 'datecreated', 'description', 'designerid', 'name', 'price', 'totalhates', 'totalmanime', 'totalmanime', 'totalpurchases', 'visible', 'picuri1', 'picuri2', 'picuri3', 'picuri4', 'picuri5', 'overlayuri', 'version'];
const NAIL_CATEGORIES_COLUMN_PROPERTIES = ['categoryid', 'name'];
const NAIL_PRODUCT_CATEGORIES_COLUMN_PROPERTIES = ['nailproductid', 'categoryid'];

const COMBINED_ORDERS_COLUMN_PROPERTIES_TYPE = ['text', 'text', 'text', 'modal', 'modal', 'modal', 'modal', 'text', 'text', 'menu', 'time'];
const ORDERS_COLUMN_PROPERTIES_TYPE = ['text', 'modal', 'modal', 'modal', 'text', 'text', 'menu', 'time'];
const GROUP_ORDERS_COLUMN_PROPERTIES_TYPE = [OPEN_PHOTOGRAMMETRY, 'modal', 'modal', 'menu', 'text', 'text', 'text', 'text'];
const USERS_COLUMN_PROPERTIES_TYPE = [OPEN_PHOTOGRAMMETRY, 'modal', 'text', 'text', 'text', 'text', 'text', 'text', 'menu', 'time', 'time', 'text', 'text', 'display', 'display', 'display'];
const ORDER_REVIEWS_COLUMN_PROPERTIES_TYPE = ['modal', 'modal', 'text', 'text', 'text', 'text', 'text'];
const SHIPPING_ADDRESSES_COLUMN_PROPERTIES_TYPE = ['modal', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text'];
const PAYMENTS_COLUMN_PROPERTIES_TYPE = ['modal'];
const DESIGNERS_COLUMN_PROPERTIES_TYPE = ['modal'];
const NAIL_PRODUCTS_COLUMN_PROPERTIES_TYPE = ['preview', 'modal', 'text', 'time', 'text', 'modal', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'image', 'image', 'image', 'image', 'image', 'image', 'text'];
const NAIL_CATEGORIES_COLUMN_PROPERTIES_TYPE = ['modal', 'text'];
const NAIL_PRODUCT_CATEGORIES_COLUMN_PROPERTIES_TYPE = ['modal', 'modal'];

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
    const endpoint = this.getEndpoint(this.props.id);
    this.getData(endpoint, this.props.id);

    this.testLambdaFunctions();
  }

  testLambdaFunctions = async () => {

    // let result = await RDSLambda('post', '/nailproductstocategory/create', {
    //   nailproductid: '3', // 2-30
    //   categoryid: '1' // 0, 1
    // });
    // console.log(result);

    // let result = await queryAdminDynamoDB('us-west-2:55304bbc-7b41-4a3f-9f9a-450575713561');
    // console.log(result);
    // result = await listAdminDynamoDB();
    // console.log(result);
    // result = await deleteAttributeAdminDynamoDB('us-west-2:55304bbc-7b41-4a3f-9f9a-450575713561', 'us-west-2:e65c7538-06eb-4e74-9ef1-4bd25a7283b1');
    // console.log(result);
    // result = await addAttributeAdminDynamoDB('us-west-2:55304bbc-7b41-4a3f-9f9a-450575713561', 'us-west-2:e65c7538-06eb-4e74-9ef1-4bd25a7283b1');
    // console.log(result);
  }

  componentDidUpdate(prevProps) {
    const endpoint = this.getEndpoint(this.props.id);
    if (this.props.id !== prevProps.id) {
      this.getData(endpoint, this.props.id);
      this.selectField(-1);
    }

    // Defensive programming, remove later
    const prevIdentityId = prevProps.userData ? prevProps.userData.identityId : null;
    const identityId = this.props.userData ? this.props.userData.identityId : null;
    if (prevIdentityId != identityId) {
      this.getData(endpoint, this.props.id);
      this.selectField(-1);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getEndpoint = (id) => {
    let endpoint = 'LambdaRDSCompany';
    if (id == 'orders' || id == 'grouporders' || id == 'users' || id == 'combinedorders')
      endpoint = 'LambdaRDSClient';
    else if (id == 'shippingaddresses' || id == 'revieworders' || id == 'payments')
      endpoint = 'LambdaRDSClientNoncritical';
    return endpoint;
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
    let pathName;
    // this is the admin account, photogrammetry
    if (user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea') {
      pathName = `/${tableName}/read`;
      if (tableName == 'orders' || tableName == 'grouporders' || tableName == 'users')
        pathName = `/${tableName}/cms/read`;
      if (tableName == 'combinedorders')
        pathName = `/orders/cms/read/combined`;

      API.get(endpoint, pathName, userInit).then(response => {
        if(response && response.rows && this._mounted) {
          this.setState({ data: response.rows });
          // console.log(response.rows)
          console.log('data done');
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

  selectField = (index, type, boundingRect) => {
    this.setState({
      selectedField: index,
      selectedFieldType: type,
      selectedBoundingRect: boundingRect
    });
  }

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

  renderUserAccessPage = () => {
    if (this.props.id !== 'useraccess') return <div />

    return (
      <UserAccess />
    )
  }

  renderVirtualized = (tableProps, table, tablePropsType, tableId) => {
    const list = List(this.state.data);
    if (!list || list.size <= 0) return;

    // return InfiniteLoaderComponent({
    //   hasNextPage: true,
    //   isNextPageLoading: false,
    //   list,
    //   loadNextPage: () => {},
    //   tableProps,
    //   table,
    //   user: this.props.userData.identityId
    // });

    return ListComponent({
      list,
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
    let table = [];
    let tableProps = [];
    let tablePropsType = [];

    const data = this.state.data;
    // const data = this.state.data.filter((row) => Object.values(row).some((rowItem) => {
    //   if (!rowItem) return false;
    //   if (typeof rowItem == 'number')
    //     return rowItem.toString().toLowerCase().indexOf(this.state.searchValue) >= 0;
    //   if (typeof rowItem == 'string')
    //     return rowItem.toLowerCase().indexOf(this.state.searchValue) >= 0;
    //   return false;
    // }));

    if (this.props.id == 'combinedorders') {
      table = COMBINED_ORDERS_COLUMN_DESCRIPTION;
      tableProps = COMBINED_ORDERS_COLUMN_PROPERTIES;
      tablePropsType = COMBINED_ORDERS_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'orders') {
      table = ORDERS_COLUMN_DESCRIPTION;
      tableProps = ORDERS_COLUMN_PROPERTIES;
      tablePropsType = ORDERS_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'grouporders') {
      table = GROUP_ORDERS_COLUMN_DESCRIPTION;
      tableProps = GROUP_ORDERS_COLUMN_PROPERTIES;
      tablePropsType = GROUP_ORDERS_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'users') {
      table = USERS_COLUMN_DESCRIPTION;
      tableProps = USERS_COLUMN_PROPERTIES;
      tablePropsType = USERS_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'revieworders') {
      table = ORDER_REVIEWS_COLUMN_DESCRIPTION;
      tableProps = ORDER_REVIEWS_COLUMN_PROPERTIES;
      tablePropsType = ORDER_REVIEWS_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'shippingaddresses') {
      table = SHIPPING_ADDRESSES_COLUMN_DESCRIPTION;
      tableProps = SHIPPING_ADDRESSES_COLUMN_PROPERTIES;
      tablePropsType = SHIPPING_ADDRESSES_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'payments') {
      table = PAYMENTS_COLUMN_DESCRIPTION;
      tableProps = PAYMENTS_COLUMN_PROPERTIES;
      tablePropsType = PAYMENTS_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'designers') {
      table = DESIGNERS_COLUMN_DESCRIPTION;
      tableProps = DESIGNERS_COLUMN_PROPERTIES;
      tablePropsType = DESIGNERS_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'nailproducts') {
      table = NAIL_PRODUCTS_COLUMN_DESCRIPTION;
      tableProps = NAIL_PRODUCTS_COLUMN_PROPERTIES;
      tablePropsType = NAIL_PRODUCTS_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'categories') {
      table = NAIL_CATEGORIES_COLUMN_DESCRIPTION;
      tableProps = NAIL_CATEGORIES_COLUMN_PROPERTIES;
      tablePropsType = NAIL_CATEGORIES_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'nailproductstocategory') {
      table = NAIL_PRODUCT_CATEGORIES_COLUMN_DESCRIPTION;
      tableProps = NAIL_PRODUCT_CATEGORIES_COLUMN_PROPERTIES;
      tablePropsType = NAIL_PRODUCT_CATEGORIES_COLUMN_PROPERTIES_TYPE;
    } else if (this.props.id == 'useraccess') {
      table.length = 3;
    }

    const numAttr = table.length;
    const date = new Date();

    return (
      <BoardBody width={1}>
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
            {this.renderUserAccessPage()}
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
