import Link from 'next/link';
import styled from 'styled-components';
import Box from './Box';

const MenuItem = styled(Box)`
  font-weight: 200;
  background: transparent;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  background: ${props => (props.bg ? props.bg : 'transparent')};
`;

const Container = styled(Box)`
  background-color: #101214;
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLink: ''
    };
  }

  selectLink = selectedLink => {
    this.setState({ selectedLink });
  };

  render() {
    return (
      <Container minWidth={[150, 200]} height='100%' bg='blacks.11' fontFamily='sansSerif'>
        <Box px={2} p={2} width={['100px', '120px']}>
          <img
            src='https://s3-us-west-2.amazonaws.com/mani-me-app/manimelogo.png'
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>

        <Box py={1}>
          <Link as={`/d/combinedorders`} href={`/data?id=combinedorders`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('combinedorders')}
              bg={this.state.selectedLink == 'combinedorders' ? '#313131' : 'transparent'}>
              COMBINED ORDERS
            </MenuItem>
          </Link>
          <Link as={`/d/orders`} href={`/data?id=orders`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('orders')}
              bg={this.state.selectedLink == 'orders' ? '#313131' : 'transparent'}>
              ORDERS
            </MenuItem>
          </Link>
          <Link as={`/d/grouporders`} href={`/data?id=grouporders`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('grouporders')}
              bg={this.state.selectedLink == 'grouporders' ? '#313131' : 'transparent'}>
              GROUP ORDERS
            </MenuItem>
          </Link>
          <Link as={`/d/users`} href={`/data?id=users`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('users')}
              bg={this.state.selectedLink == 'users' ? '#313131' : 'transparent'}>
              USERS
            </MenuItem>
          </Link>

          <Link as={`/d/revieworders`} href={`/data?id=revieworders`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('revieworders')}
              bg={this.state.selectedLink == 'revieworders' ? '#313131' : 'transparent'}>
              ORDER REVIEWS
            </MenuItem>
          </Link>
          <Link as={`/d/shippingaddresses`} href={`/data?id=shippingaddresses`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('shippingaddresses')}
              bg={this.state.selectedLink == 'shippingaddresses' ? '#313131' : 'transparent'}>
              SHIPPING ADDRESSES
            </MenuItem>
          </Link>
          <Link as={`/d/payments`} href={`/data?id=payments`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('payments')}
              bg={this.state.selectedLink == 'payments' ? '#313131' : 'transparent'}>
              PAYMENTS
            </MenuItem>
          </Link>

          <Link as={`/d/designers`} href={`/data?id=designers`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('designers')}
              bg={this.state.selectedLink == 'designers' ? '#313131' : 'transparent'}>
              DESIGNERS
            </MenuItem>
          </Link>
          <Link as={`/d/nailproducts`} href={`/data?id=nailproducts`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('nailproducts')}
              bg={this.state.selectedLink == 'nailproducts' ? '#313131' : 'transparent'}>
              NAIL PRODUCTS
            </MenuItem>
          </Link>
          <Link as={`/d/categories`} href={`/data?id=categories`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('categories')}
              bg={this.state.selectedLink == 'categories' ? '#313131' : 'transparent'}>
              NAIL CATEGORIES
            </MenuItem>
          </Link>
          <Link as={`/d/nailproductstocategory`} href={`/data?id=nailproductstocategory`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('nailproductstocategory')}
              bg={this.state.selectedLink == 'nailproductstocategory' ? '#313131' : 'transparent'}>
              NAIL PRODUCT CATEGORIES
            </MenuItem>
          </Link>
          <Link as={`/d/useraccess`} href={`/data?id=useraccess`}>
            <MenuItem
              py={1}
              px={3}
              color='whites.11'
              fontSize={0}
              onClick={() => this.selectLink('useraccess')}
              bg={this.state.selectedLink == 'useraccess' ? '#313131' : 'transparent'}>
              USER ACCESS
            </MenuItem>
          </Link>
        </Box>
      </Container>
    );
  }
}

export default Sidebar;
