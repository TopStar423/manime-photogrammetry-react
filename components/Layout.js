import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';
import Box from './Box';
import Sidebar from './Sidebar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;

const MenuItem = styled(Box)`
  font-family: sans-serif;
  font-weight: 200;
  background: transparent;
  &:hover {
    background: rgba(255,255,255,.1);
  }
`;

const Header = styled(Box)`
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
  z-index: 100;
`;

// const LayoutJsx = ({ before, ...props }) => (
//   <ThemeProvider theme={theme}>
//     <Container>
//       { !before &&
//         <Box width={1/5} height={1}>
//           Sidemenu
//         </Box>
//       }
//       <Box width={1}>
//         <Box width={1} bg='blacks.7' color='white' height={2} display='flex' alignItems='center'>
//           Orders
//         </Box>
//         {props.children}
//       </Box>
//     </Container>
//   </ThemeProvider>
// );

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    const { before, ...props } = this.props;
    const width = this.state.width;

    // https://s3-us-west-2.amazonaws.com/mani-me-app/menu.svg
    
    return (
      <ThemeProvider theme={theme}>
        <Container height={this.state.height} width={this.state.width}>
          { !before &&
            <Box minWidth={[150, 200]} height='100%' bg='blacks.11'>
              <Box px={2} p={2} width={['100px', '120px']}>
                <img src='https://s3-us-west-2.amazonaws.com/mani-me-app/manimelogo.png' style={{width: '100%', height: 'auto'}}/>

              </Box>

              <Box py={1}>
                <Link as={`/d/orders`} href={`/data?id=orders`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    ORDERS
                  </MenuItem>
                </Link>
                <Link as={`/d/grouporders`} href={`/data?id=grouporders`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    GROUP ORDERS
                  </MenuItem>
                </Link>
                <Link as={`/d/users`} href={`/data?id=users`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    USERS
                  </MenuItem>
                </Link>


                <Link as={`/d/revieworders`} href={`/data?id=revieworders`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    ORDER REVIEWS
                  </MenuItem>
                </Link>
                <Link as={`/d/shippingaddresses`} href={`/data?id=shippingaddresses`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    SHIPPING ADDRESSES
                  </MenuItem>
                </Link>
                <Link as={`/d/payments`} href={`/data?id=payments`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    PAYMENTS
                  </MenuItem>
                </Link>


                <Link as={`/d/designers`} href={`/data?id=designers`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    DESIGNERS
                  </MenuItem>
                </Link>
                <Link as={`/d/nailproducts`} href={`/data?id=nailproducts`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    NAIL PRODUCTS
                  </MenuItem>
                </Link>
                <Link as={`/d/categories`} href={`/data?id=categories`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    NAIL CATEGORIES
                  </MenuItem>
                </Link>
                <Link as={`/d/nailproductstocategory`} href={`/data?id=nailproductstocategory`}>
                  <MenuItem py={1} px={3} color='whites.11' fontSize={0}>
                    NAIL PRODUCT CATEGORIES
                  </MenuItem>
                </Link>


              </Box>
            </Box>
          }
          <Box width={[width-150, width-200]} height='100%' bg='whites.7' display='flex' flexDirection='column'>
            <Header width={1} bg='whites.9' color='blacks.2' height={2} display='flex' flex='0 0 auto' alignItems='center'>
            </Header>
            {props.children}
          </Box>


        </Container>
      </ThemeProvider>
    );
  }
}

export default Layout;
