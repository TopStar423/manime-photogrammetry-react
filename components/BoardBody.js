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
      numColumns: 0
    };
  }
  componentDidMount() {
    this._mounted = true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      const id = this.props.id;
      let endpoint = 'LambdaRDSCompany';
      if (id == 'orders' || id == 'grouporders' || id == 'users')
        endpoint = 'LambdaRDSClient';
      else if (id == 'shippingaddresses' || id == 'revieworders' || id == 'payments')
        endpoint = 'LambdaRDSClientNoncritical';

      this.getData(endpoint, this.props.id);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
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

  // ORDERS
  // comments: ""
  // datecreated: "2018-11-05T02:09:21.000Z"
  // deliverydate: "2004-10-19T08:23:54.000Z"
  // discount: 0
  // grouporderid: "c7938ff0-f832-11e8-ae6e-ff8724e0fb43"
  // listedprice: 0
  // naillength: "2MM"
  // nailproductid: "1"
  // nailshape: "BALLERINA"
  // orderid: "c7ceeb40-f832-11e8-ae6e-ff8724e0fb43"
  // orderstatus: "Order Received"
  // userid: null

  // USERS
  // credits: null
  // datecreated: null
  // datelastlogin: null
  // description: null
  // email: "ahnguye@ucdavis.edu"
  // firstname: "Andre22"
  // fitted: null
  // lastname: null
  // leftfingerscurvature: null
  // leftfingerspicture: null
  // leftthumbpicture: null
  // profilepicture: null
  // rightfingerscurvature: null
  // rightfingerspicture: null
  // rightthumbpicture: null
  // subscription: null
  // totalorders: null
  // userid: "us-west-2:ea2e2490-ebfe-4ce3-8e92-e7ed80623abe"

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

    return (
      <BoardBody width={1}>
        <BoardBodyContainer table={table}>
          <Row table={table} description>
            { table.map((item) => <RowItem>{item}</RowItem>) }
          </Row>
          <BoardBodyContents>
            { this.props.id == 'orders' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.orderid}</RowItem>
                  <RowItem>{item.grouporderid}</RowItem>
                  <RowItem>{item.nailproductid}</RowItem>
                  <RowItem>{item.naillength}</RowItem>
                  <RowItem>{item.nailshape}</RowItem>
                  <RowItem>{item.orderstatus}</RowItem>
                  <RowItem>{item.datecreated}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'grouporders' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.grouporderid}</RowItem>
                  <RowItem>{item.userid}</RowItem>
                  <RowItem>{item.grouporderstatus}</RowItem>
                  <RowItem>{item.insurance}</RowItem>
                  <RowItem>{item.shippingaddress}</RowItem>
                  <RowItem>{item.subtotal}</RowItem>
                  <RowItem>{item.taxes}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'users' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.userid}</RowItem>
                  <RowItem>{item.firstname}</RowItem>
                  <RowItem>{item.lastname}</RowItem>
                  <RowItem>{item.email}</RowItem>
                  <RowItem>{item.totalorders}</RowItem>
                  <RowItem>{item.fitted ? 'Fitted' : 'Not Fitted'}</RowItem>
                  <RowItem>{item.datecreated}</RowItem>
                  <RowItem>{item.datelastlogin}</RowItem>
                  <RowItem>{item.description}</RowItem>
                  <RowItem>{item.subscription}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'revieworders' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.reviewid}</RowItem>
                  <RowItem>{item.orderid}</RowItem>
                  <RowItem>{item.fingername}</RowItem>
                  <RowItem>{item.reviewdescription}</RowItem>
                  <RowItem>{item.category1}</RowItem>
                  <RowItem>{item.category2}</RowItem>
                  <RowItem>{item.category3}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'shippingaddresses' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.shippingaddressid}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'payments' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.paymentid}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'designers' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.designerid}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'nailproducts' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.nailproductid}</RowItem>
                  <RowItem>{item.datecreated}</RowItem>
                  <RowItem>{item.description}</RowItem>
                  <RowItem>{item.designerid}</RowItem>
                  <RowItem>{item.name}</RowItem>
                  <RowItem>{item.price}</RowItem>
                  <RowItem>{item.totalhates}</RowItem>
                  <RowItem>{item.totallikes}</RowItem>
                  <RowItem>{item.totalmanime}</RowItem>
                  <RowItem>{item.totalpurchases}</RowItem>
                  <RowItem>{item.visible}</RowItem>
                  <RowItem>{item.picuri1}</RowItem>
                  <RowItem>{item.picuri2}</RowItem>
                  <RowItem>{item.picuri3}</RowItem>
                  <RowItem>{item.picuri4}</RowItem>
                  <RowItem>{item.picuri5}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'categories' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.categoryid}</RowItem>
                  <RowItem>{item.name}</RowItem>
                </Row>
              )
            }
            { this.props.id == 'nailproductstocategory' &&
              this.state.orders.map((item) =>
                <Row table={table}>
                  <RowItem>{item.nailproductid}</RowItem>
                  <RowItem>{item.categoryid}</RowItem>
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
