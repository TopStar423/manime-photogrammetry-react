import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';
import Box from './Box';
import { RowJsx as Row, RowItemJsx as RowItem, MX_ROW, ML_ROW_ITEM, ROW_ITEM_WIDTH } from './Row';
import { API } from 'aws-amplify';

const COLUMN_DESCRIPTION = ['Group Order ID', 'Order ID', 'Nail Product ID', 'Nail Length', 'Nail Shape', 'Order Status', 'Date Created'];

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
      // this.getOrders('c7938ff0-f832-11e8-ae6e-ff8724e0fb43');
      this.getData(this.props.id);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  getData = (tableName) => {
    let userInit = {
      headers: { 'Content-Type': 'application/json' }
    }
    API.get('LambdaRDS', `/${tableName}/read`, userInit).then(ordersResponse => {
      if(ordersResponse && ordersResponse.rows && this._mounted) {
        this.setState({ orders: ordersResponse.rows });
        console.log(ordersResponse.rows)
      }
    }).catch((err) => {
      console.log(err.stack);
    });
  }

  getOrders = (groupOrderId) => {
    let userInit = {
      headers: { 'Content-Type': 'application/json' }
    }
    API.get('LambdaRDS', `/orders/read/${groupOrderId}`, userInit).then(ordersResponse => {
      if(ordersResponse && ordersResponse.rows) {
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
    let table = COLUMN_DESCRIPTION;
    return (
      <BoardBody width={1}>
        <BoardBodyContainer table={table}>
          <Row table={table} description>
            { table.map((item) => <RowItem>{item}</RowItem>) }
          </Row>
          <BoardBodyContents>

            {
              this.state.orders.map((order) =>
                <Row table={table}>
                  <RowItem>{order.grouporderid}</RowItem>
                  <RowItem>{order.orderid}</RowItem>
                  <RowItem>{order.nailproductid}</RowItem>
                  <RowItem>{order.naillength}</RowItem>
                  <RowItem>{order.nailshape}</RowItem>
                  <RowItem>{order.orderstatus}</RowItem>
                  <RowItem>{order.datecreated}</RowItem>
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
