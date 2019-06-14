import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';
import Box from './Box';
import { StandardButton, StandardInput } from './StyledComponents';
import {
  RowJsx as Row,
  RowItemComponent as RowItem,
  MX_ROW,
  ML_ROW_ITEM,
  ROW_ITEM_WIDTH
} from './Row';
import { API, Storage } from 'aws-amplify';
import uuid from 'uuid';
import { CSVLink, CSVDownload } from 'react-csv';
import { InfiniteLoaderComponent, ListComponent } from './InfiniteLoader';
import { List } from 'immutable';

import { connect } from 'react-redux';
import userData from '../reducers/userData';
import { DEFAULT } from '../actions';

const OPEN_PHOTOGRAMMETRY = 'OPEN_PHOTOGRAMMETRY';

const COMBINED_ORDERS_COLUMN_DESCRIPTION = [
  '_Email',
  'Nail Description',
  'Shipping Address',
  'User ID',
  'Order ID',
  'Group Order ID',
  'Nail Product ID',
  'Nail Length',
  'Nail Shape',
  'Order Status',
  'Date Created'
];
const ORDERS_COLUMN_DESCRIPTION = [
  '_Email',
  'Order ID',
  'Group Order ID',
  'Nail Product ID',
  'Nail Length',
  'Nail Shape',
  'Order Status',
  'Date Created'
];
const GROUP_ORDERS_COLUMN_DESCRIPTION = [
  'Group Order ID',
  'User ID',
  'Group Order Status',
  'Insurance',
  'Shipping Address',
  'Subtotal',
  'Taxes'
];
const USERS_COLUMN_DESCRIPTION = [
  '',
  'User ID',
  'First Name',
  'Last Name',
  'Email',
  '# Pics',
  'Fit Status',
  'Total Orders',
  'Fitted (Deprecated)',
  'Date Created',
  'Date Last Login',
  'Description',
  'Subscription',
  'Design Pref 1',
  'Design Pref 2',
  'Design Pref 3'
];
const ORDER_REVIEWS_COLUMN_DESCRIPTION = [
  'Review ID',
  'Order ID',
  'Finger Name',
  'Review Description',
  'Category 1',
  'Category 2',
  'Category 3'
];
const SHIPPING_ADDRESSES_COLUMN_DESCRIPTION = [
  'Shipping Address ID',
  'User ID',
  'Name',
  'Address Line 1',
  'Address Line 2',
  'City',
  'Zip Code',
  'State',
  'Country',
  'Latitude',
  'Longitude'
];
const PAYMENTS_COLUMN_DESCRIPTION = [
  'Payment ID',
  'User ID',
  'Name',
  'Last 4',
  'Refunded',
  'Paid',
  'Address Line 1',
  'Address Line 2',
  'City',
  'Zip Code',
  'State',
  'Country'
];
const DESIGNERS_COLUMN_DESCRIPTION = [
  'Designer ID',
  'First Name',
  'Last Name',
  'Total Reviews',
  'Total Designs',
  'Profile Picture',
  'Description',
  'Location',
  'Url 1',
  'Url 2',
  'Url 3',
  'Url 4',
  'Url 5',
  'Url 6'
];
const NAIL_PRODUCTS_COLUMN_DESCRIPTION = [
  'Nail Product ID',
  'Index',
  'Date Created',
  'Description',
  'Designer ID',
  'Name',
  'Price',
  'Total Hates',
  'Total Likes',
  'Total Manime',
  'Total Purchases',
  'Visible',
  'Pic Url 1',
  'Pic Url 2',
  'Pic Url 3',
  'Pic Url 4',
  'Pic Url 5',
  'Overlay Url',
  'Version'
];
const NAIL_CATEGORIES_COLUMN_DESCRIPTION = ['Category ID', 'Category Name'];
const NAIL_PRODUCT_CATEGORIES_COLUMN_DESCRIPTION = ['Nail Product ID', 'Category ID'];

const COMBINED_ORDERS_COLUMN_PROPERTIES = [
  'email',
  'description',
  'shippingaddress',
  'userid',
  'orderid',
  'grouporderid',
  'nailproductid',
  'naillength',
  'nailshape',
  'orderstatus',
  'datecreated'
];
const ORDERS_COLUMN_PROPERTIES = [
  'email',
  'orderid',
  'grouporderid',
  'nailproductid',
  'naillength',
  'nailshape',
  'orderstatus',
  'datecreated'
];
const GROUP_ORDERS_COLUMN_PROPERTIES = [
  'grouporderid',
  'userid',
  'grouporderstatus',
  'insurance',
  'shippingaddress',
  'subtotal',
  'taxes'
];
const USERS_COLUMN_PROPERTIES = [
  'userid',
  'userid',
  'firstname',
  'lastname',
  'email',
  'numpics',
  'fitstatus',
  'totalorders',
  'fitted',
  'datecreated',
  'datelastlogin',
  'description',
  'subscription',
  'designpref',
  'designpref2',
  'designpref3'
];
const ORDER_REVIEWS_COLUMN_PROPERTIES = [
  'reviewid',
  'orderid',
  'fingername',
  'reviewdescription',
  'category1',
  'category2',
  'category3'
];
const SHIPPING_ADDRESSES_COLUMN_PROPERTIES = [
  'shippingaddressid',
  'userid',
  'name',
  'addressline1',
  'addressline2',
  'city',
  'addresszip',
  'addresstate',
  'addresscountry',
  'addresslatitude',
  'addresslongitude'
];
const PAYMENTS_COLUMN_PROPERTIES = ['paymentid'];
const DESIGNERS_COLUMN_PROPERTIES = ['designerid'];
const NAIL_PRODUCTS_COLUMN_PROPERTIES = [
  'nailproductid',
  'index',
  'datecreated',
  'description',
  'designerid',
  'name',
  'price',
  'totalhates',
  'totalmanime',
  'totalmanime',
  'totalpurchases',
  'visible',
  'picuri1',
  'picuri2',
  'picuri3',
  'picuri4',
  'picuri5',
  'overlayuri',
  'version'
];
const NAIL_CATEGORIES_COLUMN_PROPERTIES = ['categoryid', 'name'];
const NAIL_PRODUCT_CATEGORIES_COLUMN_PROPERTIES = ['nailproductid', 'categoryid'];

const COMBINED_ORDERS_COLUMN_PROPERTIES_TYPE = [
  'text',
  'text',
  'text',
  'modal',
  'modal',
  'modal',
  'modal',
  'text',
  'text',
  'menu',
  'time'
];
const ORDERS_COLUMN_PROPERTIES_TYPE = [
  'text',
  'modal',
  'modal',
  'modal',
  'text',
  'text',
  'menu',
  'time'
];
const GROUP_ORDERS_COLUMN_PROPERTIES_TYPE = [
  'modal',
  'modal',
  'menu',
  'text',
  'text',
  'text',
  'text'
];
const USERS_COLUMN_PROPERTIES_TYPE = [
  OPEN_PHOTOGRAMMETRY,
  'modal',
  'text',
  'text',
  'text',
  'text',
  'text',
  'text',
  'menu',
  'time',
  'time',
  'text',
  'text',
  'display',
  'display',
  'display'
];
const ORDER_REVIEWS_COLUMN_PROPERTIES_TYPE = [
  'modal',
  'modal',
  'text',
  'text',
  'text',
  'text',
  'text'
];
const SHIPPING_ADDRESSES_COLUMN_PROPERTIES_TYPE = [
  'modal',
  'text',
  'text',
  'text',
  'text',
  'text',
  'text',
  'text',
  'text',
  'text',
  'text'
];
const PAYMENTS_COLUMN_PROPERTIES_TYPE = ['modal'];
const DESIGNERS_COLUMN_PROPERTIES_TYPE = ['modal'];
const NAIL_PRODUCTS_COLUMN_PROPERTIES_TYPE = [
  'modal',
  'text',
  'time',
  'text',
  'modal',
  'text',
  'text',
  'text',
  'text',
  'text',
  'text',
  'text',
  'image',
  'image',
  'image',
  'image',
  'image',
  'image',
  'text'
];
const NAIL_CATEGORIES_COLUMN_PROPERTIES_TYPE = ['modal', 'text'];
const NAIL_PRODUCT_CATEGORIES_COLUMN_PROPERTIES_TYPE = ['modal', 'modal'];

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
  width: ${props => {
    const numColumns = props.table.length;
    const width =
      props.theme.space[MX_ROW] * 2 +
      (props.theme.space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns;
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
      searchValue: ''
    };
  }

  componentDidMount() {
    this._mounted = true;
    const endpoint = this.getEndpoint(this.props.id);
    this.getData(endpoint, this.props.id);
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

  getEndpoint = id => {
    let endpoint = 'LambdaRDSCompany';
    if (id == 'orders' || id == 'grouporders' || id == 'users' || id == 'combinedorders')
      endpoint = 'LambdaRDSClient';
    else if (id == 'shippingaddresses' || id == 'revieworders' || id == 'payments')
      endpoint = 'LambdaRDSClientNoncritical';
    return endpoint;
  };

  getData = async (endpoint, tableName) => {
    this.setState({
      endpoint,
      tableName,
      data: []
    });
    let userInit = {
      headers: { 'Content-Type': 'application/json' }
    };

    const user = this.props.userData ? this.props.userData.identityId : '';
    let pathName;
    // this is the admin account, photogrammetry
    if (user == 'us-west-2:130355da-2eec-4f35-8092-3eca4d22d8ea') {
      pathName = `/${tableName}/read`;
      if (tableName == 'orders' || tableName == 'grouporders' || tableName == 'users')
        pathName = `/${tableName}/cms/read`;
      if (tableName == 'combinedorders') pathName = `/orders/cms/read/combined`;

      API.get(endpoint, pathName, userInit)
        .then(response => {
          if (response && response.rows && this._mounted) {
            this.setState({ data: response.rows });
            // console.log(response.rows)
            console.log('data done');
          }
        })
        .catch(err => {
          // console.log(err.stack);
        });
    } else {
      if (tableName != 'users') return;
      // get the array of ids that this user can see from rds. dynamodb might be good
      // one user id -> many user ids

      var dynamoDBObject = {};
      await API.get('LambdaServer', `/access/${user}`)
        .then(response => {
          dynamoDBObject = response[0];
        })
        .catch(err => {
          console.log(err);
        });

      for (const key in dynamoDBObject) {
        const value = dynamoDBObject[key];
        if (key == user) continue;
        pathName = `/${tableName}/read/${value}`;

        API.get(endpoint, pathName, userInit)
          .then(response => {
            if (response && response.rows && this._mounted) {
              this.setState({ data: [...this.state.data, ...response.rows] });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  createRow = () => {
    if (this.props.id == 'nailproducts') {
      let userData = {
        nailproductid: uuid.v1()
      };
      let userInit = {
        body: userData,
        headers: { 'Content-Type': 'application/json' }
      };
      API.post(this.state.endpoint, '/nailproducts/create', userInit)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.stack);
        });
    }
  };

  selectField = (index, type, boundingRect) => {
    this.setState({
      selectedField: index,
      selectedFieldType: type,
      selectedBoundingRect: boundingRect
    });
    // console.log(boundingRect);
  };

  updateField = (id, propertyName, propertyValue) => {
    // let _orders = this.state.orders;
    // _orders[index][propertyName] = propertyValue;
    // this.setState({
    //   orders: _orders
    // });

    // LAMBDA
    if (this.props.id == 'nailproducts') {
      let userData = {
        nailproductid: id,
        columnname: propertyName,
        columnvalue: propertyValue
      };
      let userInit = {
        body: userData,
        headers: { 'Content-Type': 'application/json' }
      };
      API.post(this.state.endpoint, '/nailproducts/update/column', userInit)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.stack);
        });
    }
  };

  updateSearchBar = searchValue => {
    this.setState({ searchValue });
  };

  // addColumnFromDiffTable = (tableName, id, propName) => {
  //   if (typeof tableName != 'string' || typeof id != 'string' || typeof propName != 'string')
  //     return {};
  //
  //   let userInit = {
  //     headers: { 'Content-Type': 'application/json' }
  //   }
  //   API.get(this.getEndpoint(tableName), `/${tableName}/read/${id}`, userInit).then(response => {
  //     // console.log(response);
  //     if(response && response.rows && this._mounted) {
  //     }
  //   }).catch((err) => {
  //     // console.log(err.stack);
  //   });
  // }

  sortData = item => {
    console.log('here');
    console.log(item);
    const newData = [...this.state.data];
    newData.sort((a, b) => {
      if (a[item] < b[item]) {
        return -1;
      }
      if (a[item] > b[item]) {
        return 1;
      }
      return 0;
    });
    console.log(newData);
    this.setState({ data: newData });
  };

  renderVirtualized = (tableProps, table) => {
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
      user: this.props.userData.identityId
    });
  };

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
    }

    const numAttr = table.length;
    const date = new Date();
    return (
      <BoardBody width={1}>
        <Box display='flex' flexDirection='row' width='100%' pt={3} pb={2}>
          <StandardButton
            ml={3}
            onClick={() => this.getData(this.state.endpoint, this.state.tableName)}>
            Refresh
          </StandardButton>
          <StandardButton
            ml={3}
            onClick={this.createRow}
            disabled={this.props.id == 'nailproducts' ? false : true}>
            New
          </StandardButton>
          <StandardButton ml={3} disabled>
            Save
          </StandardButton>
          <CSVLink data={data} filename={`${this.props.id}-${date.toString()}.csv`}>
            <StandardButton ml={3} style={{ textDecoration: 'none' }}>
              Save CSV
            </StandardButton>
          </CSVLink>
          <StandardInput
            ml={3}
            value={this.state.searchValue}
            onChange={ev => this.updateSearchBar(ev.target.value.toLowerCase())}></StandardInput>
        </Box>
        <BoardBodyContainer table={table}>
          {/* <Row table={table} description>
            { table.map((item, i) => <RowItem type='display' onClick={() => this.sortData(tableProps[i])}>{item}</RowItem>) }
          </Row> */}
          <div>
            {table.map((item, i) => (
              <div
                type='display'
                style={{ width: '200px', marginLeft: '10px', display: 'inline-block' }}
                onClick={() => this.sortData(tableProps[i])}>
                {item}
              </div>
            ))}
          </div>
          <BoardBodyContents>
            {this.renderVirtualized(tableProps, table)

            // data.map((item, i) =>
            //   // data is the database table, and item is a row in that table
            //   <Row table={table}>
            //     {
            //       tableProps.map((rowItem, j) => {
            //         // tableProps is an array containing each column's variable name, rowItem could be userid or nailproductid
            //         const fieldNum = (i * numAttr) + j;
            //         return (
            //
            //           <RowItem>
            //             {
            //               item[tableProps[j]]
            //             }
            //           </RowItem>
            //           // change
            //           // <RowItem item={item} i={uuid.v1()} fieldNum={fieldNum} propertyName={tableProps[j]} propertyValue={item[tableProps[j]]} type={tablePropsType[j]} updateField={this.updateField} selectField={this.selectField} selectedField={this.state.selectedField}>
            //           //   { tableProps[j] ==  'fitted' && item[tableProps[j]] == false ?
            //           //       'false'
            //           //     :
            //           //       item[tableProps[j]]
            //           //   }
            //           // </RowItem>
            //         );
            //       })
            //     }
            //   </Row>
            // )
            }
          </BoardBodyContents>
        </BoardBodyContainer>
      </BoardBody>
    );
  }
}

const mapStateToProps = state => ({
  userData: userData(state.userData, { type: 'DEFAULT' })
});

export default connect(
  mapStateToProps,
  null
)(BoardJsx);
