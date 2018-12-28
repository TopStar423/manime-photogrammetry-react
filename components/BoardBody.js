import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';
import Box from './Box';
import { RowJsx as Row, RowItemJsx as RowItem, MX_ROW, ML_ROW_ITEM, ROW_ITEM_WIDTH } from './Row';
import { API } from 'aws-amplify';

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
      selectedField: -1
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
    let userInit = {
      headers: { 'Content-Type': 'application/json' }
    }
    API.get(endpoint, `/${tableName}/read`, userInit).then(ordersResponse => {
      if(ordersResponse && ordersResponse.rows && this._mounted) {
        this.setState({ orders: ordersResponse.rows });
        console.log(ordersResponse.rows)
      }
    }).catch((err) => {
      console.log(err.stack);
    });
  }

  selectField = (index) => {
    this.setState({
      selectedField: index
    })
  }

  updateField = (index, propertyName, propertyValue) => {
    let _orders = this.state.orders;
    _orders[index][propertyName] = propertyValue;
    this.setState({
      orders: _orders
    });
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
        <BoardBodyContainer table={table}>
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
                      return <RowItem i={i} fieldNum={fieldNum} propertyName={tableProps[j]} type={tablePropsType[j]} updateField={this.updateField} onClick={() => this.selectField(fieldNum)} selectedField={this.state.selectedField}>{item[tableProps[j]]}</RowItem>;
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

export default BoardJsx;
