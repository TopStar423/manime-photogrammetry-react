import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';
import Box from './Box';
import { RowJsx, RowItem } from './Row';
import { API } from 'aws-amplify';

const BoardBody = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  background-color: #fafafa;
  flex: 1 0 100%;
`;

class BoardJsx extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.getOrders('c7938ff0-f832-11e8-ae6e-ff8724e0fb43');
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

  render() {
    return (
      <BoardBody>
        <Box display='flex' flexDirection='row' p={2} m={3}>
          <RowItem mx={2} description={true} fontSize={1}>Group Order ID</RowItem>
          <RowItem mx={2} description={true} fontSize={1}>Order ID</RowItem>
          <RowItem mx={2} description={true} fontSize={1}>Nail Product ID</RowItem>
          <RowItem mx={2} description={true} fontSize={1}>Nail Length</RowItem>
          <RowItem mx={2} description={true} fontSize={1}>Nail Shape</RowItem>
          <RowItem mx={2} description={true} fontSize={1}>Order Status</RowItem>
          <RowItem mx={2} description={true} fontSize={1}>Date Created</RowItem>
        </Box>

        {
          this.state.orders.map((order) =>
            <RowJsx key={order.orderid}>
              <RowItem mx={2} fontSize={1}>{order.grouporderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailproductid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.naillength}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailshape}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderstatus}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.datecreated}</RowItem>
            </RowJsx>
          )
        }
        {
          this.state.orders.map((order) =>
            <RowJsx key={order.orderid}>
              <RowItem mx={2} fontSize={1}>{order.grouporderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailproductid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.naillength}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailshape}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderstatus}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.datecreated}</RowItem>
            </RowJsx>
          )
        }
        {
          this.state.orders.map((order) =>
            <RowJsx key={order.orderid}>
              <RowItem mx={2} fontSize={1}>{order.grouporderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailproductid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.naillength}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailshape}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderstatus}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.datecreated}</RowItem>
            </RowJsx>
          )
        }
        {
          this.state.orders.map((order) =>
            <RowJsx key={order.orderid}>
              <RowItem mx={2} fontSize={1}>{order.grouporderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailproductid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.naillength}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailshape}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderstatus}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.datecreated}</RowItem>
            </RowJsx>
          )
        }
        {
          this.state.orders.map((order) =>
            <RowJsx key={order.orderid}>
              <RowItem mx={2} fontSize={1}>{order.grouporderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailproductid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.naillength}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailshape}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderstatus}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.datecreated}</RowItem>
            </RowJsx>
          )
        }
        {
          this.state.orders.map((order) =>
            <RowJsx key={order.orderid}>
              <RowItem mx={2} fontSize={1}>{order.grouporderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailproductid}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.naillength}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.nailshape}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.orderstatus}</RowItem>
              <RowItem mx={2} fontSize={1}>{order.datecreated}</RowItem>
            </RowJsx>
          )
        }
      </BoardBody>
    );
  }
};

export default BoardJsx;
