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

const ORDERS_COLUMN_PROPERTIES = ['orderid', 'grouporderid', 'nailproductid', 'naillength', 'nailshape', 'orderstatus', 'datecreated'];

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

  // this.updateField(i, 'orderid', 'TEST')

  render() {
    let table = this.props.id == 'orders' ? ORDERS_COLUMN_DESCRIPTION
              : this.props.id == 'grouporders' ? GROUP_ORDERS_COLUMN_DESCRIPTION
              : this.props.id == 'users' ? USERS_COLUMN_DESCRIPTION
              : this.props.id == 'revieworders' ? ORDER_REVIEWS_COLUMN_DESCRIPTION
              : this.props.id == 'shippingaddresses' ? SHIPPING_ADDRESSES_COLUMN_DESCRIPTION
              : this.props.id == 'payments' ? PAYMENTS_COLUMN_DESCRIPTION
              : this.props.id == 'designers' ? DESIGNERS_COLUMN_DESCRIPTION
              : this.props.id == 'nailproducts' ? NAIL_PRODUCTS_COLUMN_DESCRIPTION
              : this.props.id == 'categories' ? NAIL_CATEGORIES_COLUMN_DESCRIPTION
              : this.props.id == 'nailproductstocategory' ? NAIL_PRODUCT_CATEGORIES_COLUMN_DESCRIPTION
              : [];
    const tableProps = ORDERS_COLUMN_PROPERTIES;
    const data = this.state.orders;
    const numAttr = table.length;

    // <RowItem onClick={() => this.selectField((i*numAttr)+1)}>{item.grouporderid}</RowItem>
    // <RowItem onClick={() => this.selectField((i*numAttr)+2)}>{item.nailproductid}</RowItem>
    // <RowItem onClick={() => this.selectField((i*numAttr)+3)} selected={this.state.selectedField == (i*numAttr) + 3 ? true : false}>{item.naillength}</RowItem>
    // <RowItem onClick={() => this.selectField((i*numAttr)+4)} selected={this.state.selectedField == (i*numAttr) + 4 ? true : false}>{item.nailshape}</RowItem>
    // <RowItem onClick={() => this.selectField((i*numAttr)+5)} selected={this.state.selectedField == (i*numAttr) + 5 ? true : false}>{item.orderstatus}</RowItem>
    // <RowItem onClick={() => this.selectField((i*numAttr)+6)} selected={this.state.selectedField == (i*numAttr) + 6 ? true : false}>{item.datecreated}</RowItem>

    return (
      <BoardBody width={1}>
        <BoardBodyContainer table={table}>
          <Row table={table} description>
            { table.map((item) => <RowItem>{item}</RowItem>) }
          </Row>
          <BoardBodyContents>
            { this.props.id == 'orders' &&
              data.map((item, i) =>
                <Row table={table}>
                  {
                    tableProps.map((rowItem, j) => <RowItem i={(i*numAttr)+j} propertyName={ORDERS_COLUMN_PROPERTIES[j]} updateField={this.updateField} onClick={() => this.selectField((i*numAttr)+j)} selected={this.state.selectedField == (i*numAttr) + j ? true : false}>{item[ORDERS_COLUMN_PROPERTIES[j]]}</RowItem>)
                  }
                </Row>
              )
            }
            { this.props.id == 'grouporders' &&
              data.map((item, i) =>
                <Row table={table}>
                  <RowItem onClick={() => this.selectField((i*numAttr)+0)}>{item.grouporderid}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+1)}>{item.userid}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+2)} selected={this.state.selectedField == (i*numAttr) + 2 ? true : false}>{item.grouporderstatus}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+3)} selected={this.state.selectedField == (i*numAttr) + 3 ? true : false}>{item.insurance}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+4)} selected={this.state.selectedField == (i*numAttr) + 4 ? true : false}>{item.shippingaddress}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+5)} selected={this.state.selectedField == (i*numAttr) + 5 ? true : false}>{item.subtotal}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+6)} selected={this.state.selectedField == (i*numAttr) + 6 ? true : false}>{item.taxes}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'users' &&
              data.map((item, i) =>
                <Row table={table}>
                  <RowItem onClick={() => this.selectField((i*numAttr)+0)}>{item.userid}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+1)} selected={this.state.selectedField == (i*numAttr) + 1 ? true : false}>{item.firstname}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+2)} selected={this.state.selectedField == (i*numAttr) + 2 ? true : false}>{item.lastname}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+3)} selected={this.state.selectedField == (i*numAttr) + 3 ? true : false}>{item.email}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+4)} selected={this.state.selectedField == (i*numAttr) + 4 ? true : false}>{item.totalorders}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+5)} selected={this.state.selectedField == (i*numAttr) + 5 ? true : false}>{item.fitted ? 'Fitted' : 'Not Fitted'}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+6)} selected={this.state.selectedField == (i*numAttr) + 6 ? true : false}>{item.datecreated}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+7)} selected={this.state.selectedField == (i*numAttr) + 7 ? true : false}>{item.datelastlogin}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+8)} selected={this.state.selectedField == (i*numAttr) + 8 ? true : false}>{item.description}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+9)} selected={this.state.selectedField == (i*numAttr) + 9 ? true : false}>{item.subscription}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'revieworders' &&
              data.map((item, i) =>
                <Row table={table}>
                  <RowItem onClick={() => this.selectField((i*numAttr)+0)}>{item.reviewid}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+1)}>{item.orderid}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+2)} selected={this.state.selectedField == (i*numAttr) + 2 ? true : false}>{item.fingername}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+3)} selected={this.state.selectedField == (i*numAttr) + 3 ? true : false}>{item.reviewdescription}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+4)} selected={this.state.selectedField == (i*numAttr) + 4 ? true : false}>{item.category1}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+5)} selected={this.state.selectedField == (i*numAttr) + 5 ? true : false}>{item.category2}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+6)} selected={this.state.selectedField == (i*numAttr) + 6 ? true : false}>{item.category3}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'shippingaddresses' &&
              data.map((item, i) =>
                <Row table={table}>
                  <RowItem onClick={() => this.selectField((i*numAttr)+0)}>{item.shippingaddressid}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'payments' &&
              data.map((item, i) =>
                <Row table={table}>
                  <RowItem onClick={() => this.selectField((i*numAttr)+0)}>{item.paymentid}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'designers' &&
              data.map((item, i) =>
                <Row table={table}>
                  <RowItem onClick={() => this.selectField((i*numAttr)+0)}>{item.designerid}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'nailproducts' &&
              data.map((item, i) =>
                <Row table={table}>
                  <RowItem onClick={() => this.selectField((i*numAttr)+0)}>{item.nailproductid}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+1)} selected={this.state.selectedField == (i*numAttr) + 1 ? true : false}>{item.datecreated}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+2)} selected={this.state.selectedField == (i*numAttr) + 2 ? true : false}>{item.description}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+3)} selected={this.state.selectedField == (i*numAttr) + 3 ? true : false}>{item.designerid}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+4)} selected={this.state.selectedField == (i*numAttr) + 4 ? true : false}>{item.name}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+5)} selected={this.state.selectedField == (i*numAttr) + 5 ? true : false}>{item.price}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+6)} selected={this.state.selectedField == (i*numAttr) + 6 ? true : false}>{item.totalhates}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+7)} selected={this.state.selectedField == (i*numAttr) + 7 ? true : false}>{item.totallikes}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+8)} selected={this.state.selectedField == (i*numAttr) + 8 ? true : false}>{item.totalmanime}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+9)} selected={this.state.selectedField == (i*numAttr) + 9 ? true : false}>{item.totalpurchases}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+10)} selected={this.state.selectedField == (i*numAttr) + 10 ? true : false}>{item.visible}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+11)} selected={this.state.selectedField == (i*numAttr) + 11 ? true : false}>{item.picuri1}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+12)} selected={this.state.selectedField == (i*numAttr) + 12 ? true : false}>{item.picuri2}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+13)} selected={this.state.selectedField == (i*numAttr) + 13 ? true : false}>{item.picuri3}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+14)} selected={this.state.selectedField == (i*numAttr) + 14 ? true : false}>{item.picuri4}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+15)} selected={this.state.selectedField == (i*numAttr) + 15 ? true : false}>{item.picuri5}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'categories' &&
              data.map((item, i) =>
                <Row table={table}>
                  <RowItem onClick={() => this.selectField((i*numAttr)+0)}>{item.categoryid}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+1)} selected={this.state.selectedField == (i*numAttr) + 1 ? true : false}>{item.name}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'nailproductstocategory' &&
              data.map((item, i) =>
                <Row table={table}>
                  <RowItem onClick={() => this.selectField((i*numAttr)+0)}>{item.nailproductid}</RowItem>
                  <RowItem onClick={() => this.selectField((i*numAttr)+1)}>{item.categoryid}</RowItem>
                </Row>
              )
            }
          </BoardBodyContents>
        </BoardBodyContainer>
      </BoardBody>
    );
  }
};

// <Box height='100px' display='flex' flexDirection='row'>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
//   <Box flex='0 0 auto' height='100%' border='1px solid' width='250px'></Box>
// </Box>

// <Box display='flex' flexDirection='row' p={2} m={3}>
//   { table.map((item) => <RowItem mx={2} description={true} fontSize={1}>{item}</RowItem>) }
// </Box>

//   {
//     this.state.orders.map((order) =>
//       <RowJsx key={order.orderid}>
//         <RowItem mx={2} fontSize={1}>{order.grouporderid}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.orderid}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.nailproductid}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.naillength}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.nailshape}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.orderstatus}</RowItem>
//         <RowItem mx={2} fontSize={1}>{order.datecreated}</RowItem>
//       </RowJsx>
//     )
//   }

export default BoardJsx;
