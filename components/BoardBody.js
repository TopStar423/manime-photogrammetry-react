import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';
import Box from './Box';
import { RefreshButton } from './StyledComponents';
import { RowJsx as Row, RowItemJsx as RowItem, MX_ROW, ML_ROW_ITEM, ROW_ITEM_WIDTH } from './Row';
import { API } from 'aws-amplify';
import { connect } from "react-redux";

const ORDERS_COLUMN_DESCRIPTION = ['Order ID', 'Group Order ID', 'Nail Product ID', 'Nail Length', 'Nail Shape', 'Order Status', 'Date Created'];
const GROUP_ORDERS_COLUMN_DESCRIPTION = ['Group Order ID', 'User ID', 'Group Order Status', 'Insurance', 'Shipping Address', 'Subtotal', 'Taxes'];
const USERS_COLUMN_DESCRIPTION = ['User ID', 'First Name', 'Last Name', 'Email', 'Total Orders', 'Fitted', 'Date Created', 'Date Last Login', 'Description', 'Subscription'];
const ORDER_REVIEWS_COLUMN_DESCRIPTION = ['Review ID', 'Order ID', 'Finger Name', 'Review Description', 'Category 1', 'Category 2', 'Category 3'];
const SHIPPING_ADDRESSES_COLUMN_DESCRIPTION = ['Shipping Address ID', 'User ID', 'Name', 'Address Line 1', 'Address Line 2', 'City', 'Zip Code', 'State', 'Country', 'Latitude', 'Longitude'];
const PAYMENTS_COLUMN_DESCRIPTION = ['Payment ID', 'User ID', 'Name', 'Last 4', 'Refunded', 'Paid', 'Address Line 1', 'Address Line 2', 'City', 'Zip Code', 'State', 'Country'];
const DESIGNERS_COLUMN_DESCRIPTION = ['Designer ID', 'First Name', 'Last Name', 'Total Reviews', 'Total Designs', 'Profile Picture', 'Description', 'Location', 'Url 1', 'Url 2', 'Url 3', 'Url 4', 'Url 5', 'Url 6'];
const NAIL_PRODUCTS_COLUMN_DESCRIPTION = ['Nail Product ID', 'Date Created', 'Description', 'Designer ID', 'Name', 'Price', 'Total Hates', 'Total Likes', 'Total Manime', 'Total Purchases', 'Visible', 'Pic Url 1', 'Pic Url 2', 'Pic Url 3', 'Pic Url 4', 'Pic Url 5'];
const NAIL_CATEGORIES_COLUMN_DESCRIPTION = ['Category ID', 'Category Name'];
const NAIL_PRODUCT_CATEGORIES_COLUMN_DESCRIPTION = ['Nail Product ID', 'Category ID'];

const ORDERS_COLUMN_PROPERTIES      = ['orderid', 'grouporderid', 'nailproductid', 'naillength', 'nailshape', 'orderstatus', 'datecreated'];
const GROUP_ORDERS_COLUMN_PROPERTIES = ['grouporderid', 'userid', 'grouporderstatus', 'insurance', 'shippingaddress', 'subtotal', 'taxes'];
const USERS_COLUMN_PROPERTIES = ['userid', 'firstname', 'lastname', 'email', 'totalorders', 'fitted', 'datecreated', 'datelastlogin', 'description', 'subscription'];
const ORDER_REVIEWS_COLUMN_PROPERTIES = ['reviewid', 'orderid', 'fingername', 'reviewdescription', 'category1', 'category2', 'category3'];
const SHIPPING_ADDRESSES_COLUMN_PROPERTIES = ['shippingaddressid'];
const PAYMENTS_COLUMN_PROPERTIES = ['paymentid'];
const DESIGNERS_COLUMN_PROPERTIES = ['designerid'];
const NAIL_PRODUCTS_COLUMN_PROPERTIES = ['nailproductid', 'datecreated', 'description', 'designerid', 'name', 'price', 'totalhates', 'totalmanime', 'totalpurchases', 'visible', 'picuri1', 'picuri2', 'picuri3', 'picuri4', 'picuri5'];
const NAIL_CATEGORIES_COLUMN_PROPERTIES = ['categoryid', 'name'];
const NAIL_PRODUCT_CATEGORIES_COLUMN_PROPERTIES = ['nailproductid', 'categoryid'];

const ORDERS_COLUMN_PROPERTIES_TYPE = ['display', 'display', 'display', 'text', 'text', 'menu', 'display'];
const GROUP_ORDERS_COLUMN_PROPERTIES_TYPE = ['display', 'display', 'text', 'text', 'text', 'text', 'text'];
const USERS_COLUMN_PROPERTIES_TYPE = ['display', 'text', 'text', 'display', 'text', 'text', 'text', 'text', 'text', 'text'];
const ORDER_REVIEWS_COLUMN_PROPERTIES_TYPE = ['display', 'display', 'text', 'text', 'text', 'text', 'text'];
const SHIPPING_ADDRESSES_COLUMN_PROPERTIES_TYPE = ['display'];
const PAYMENTS_COLUMN_PROPERTIES_TYPE = ['display'];
const DESIGNERS_COLUMN_PROPERTIES_TYPE = ['display'];
const NAIL_PRODUCTS_COLUMN_PROPERTIES_TYPE = ['display', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text', 'text'];
const NAIL_CATEGORIES_COLUMN_PROPERTIES_TYPE = ['display', 'text'];
const NAIL_PRODUCT_CATEGORIES_COLUMN_PROPERTIES_TYPE = ['display', 'display'];


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
      orders: [],
      numColumns: 0,
      selectedField: -1,
      selectedFieldType: 'display',
      selectedBoundingRect: {},
      endpoint: '',
      tableName: ''
    };
  }

  componentDidMount() {
    this._mounted = true;
    const endpoint = this.getEndpoint(this.props.id);
    this.getData(endpoint, this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      const endpoint = this.getEndpoint(this.props.id);
      this.getData(endpoint, this.props.id);
      this.selectField(-1);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getEndpoint = (id) => {
    let endpoint = 'LambdaRDSCompany';
    if (id == 'orders' || id == 'grouporders' || id == 'users')
      endpoint = 'LambdaRDSClient';
    else if (id == 'shippingaddresses' || id == 'revieworders' || id == 'payments')
      endpoint = 'LambdaRDSClientNoncritical';
    return endpoint;
  }

  getData = (endpoint, tableName) => {
    this.setState({
      endpoint,
      tableName
    });
    let userInit = {
      headers: { 'Content-Type': 'application/json' }
    }
    API.get(endpoint, `/${tableName}/read`, userInit).then(ordersResponse => {
      if(ordersResponse && ordersResponse.rows && this._mounted) {
        this.setState({ orders: ordersResponse.rows });
        console.log(ordersResponse.rows)
      }
    }).catch((err) => {
      // console.log(err.stack);
    });
  }

  selectField = (index, type, boundingRect) => {
    this.setState({
      selectedField: index,
      selectedFieldType: type,
      selectedBoundingRect: boundingRect
    })
    //console.log(boundingRect);
  }

  updateField = (index, propertyName, propertyValue) => {
    let _orders = this.state.orders;
    _orders[index][propertyName] = propertyValue;
    this.setState({
      orders: _orders
    });

    // LAMBDA
    // if (this.props.id == 'users') {
    //   let userData = {
    //     userid: this.state.orders[index]['userid'],
    //     columnname: 'fitted',
    //     columnvalue: propertyValue
    //   }
    //   let userInit = {
    //       body: userData,
    //       headers: { 'Content-Type': 'application/json' }
    //   }
    //   API.post(this.state.endpoint, '/users/update/column', userInit).then(response => {
    //       console.log(response);
    //   }).catch(error => {
    //       console.log(error);
    //   });
    // }
  }

  render() {
    let table = [];
    let tableProps = [];
    let tablePropsType = [];

    if (this.props.id == 'orders') {
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

    const data = this.state.orders;
    const numAttr = table.length;

    return (
      <BoardBody width={1}>
        { this.state.selectedFieldType == 'menu' &&
          <div style={{backgroundColor: '#000', width: '100px', height: '100px', position: 'absolute', zIndex: 1000, top: this.state.selectedBoundingRect.bottom, left: this.state.selectedBoundingRect.left}}></div>
        }
        <BoardBodyContainer table={table}>
          <RefreshButton mt={3} mx={3} mb={2} onClick={() => this.getData(this.state.endpoint, this.state.tableName)}>Refresh</RefreshButton>
          <Row table={table} description>
            { table.map((item) => <RowItem type='display'>{item}</RowItem>) }
          </Row>
          <BoardBodyContents>
            {
              data.map((item, i) =>
                <Row table={table}>
                  {
                    tableProps.map((rowItem, j) => {
                      const fieldNum = (i * numAttr) + j;
                      return (
                        <RowItem i={i} fieldNum={fieldNum} propertyName={tableProps[j]} type={tablePropsType[j]} updateField={this.updateField} selectField={this.selectField} selectedField={this.state.selectedField}>
                          { tableProps[j] ==  'fitted' && item[tableProps[j]] == false ?
                              'false'
                            :
                              item[tableProps[j]]
                          }
                        </RowItem>
                      );
                    })
                  }
                </Row>
              )
            }
          </BoardBodyContents>
        </BoardBodyContainer>
      </BoardBody>
    );
  }
};

export default connect()(BoardJsx);
