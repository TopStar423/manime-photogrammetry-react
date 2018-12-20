import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';
import Row from './Row';
import { API } from 'aws-amplify';

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
      <div>
        {
          this.state.orders.map((order) =>
            <Row key={order.orderid}>
              {order.orderid}
            </Row>
          )
        }
      </div>
    );
  }
};

export default BoardJsx;
