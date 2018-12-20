import { space, width, fontSize, color, height, justifyContent, alignItems, display, fontFamily, fontWeight } from 'styled-system';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';

import Sidebar from './Sidebar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  height: ${props => props.height}px;
`;

const Box = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${height}
  ${justifyContent}
  ${display}
  ${alignItems}
  ${fontFamily}
  ${fontWeight}
  position: ${props => props.position};
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
    return (
      <ThemeProvider theme={theme}>
        <Container height={this.state.height}>
          { !before &&
            <Box width={1/4} py={2} height='100%' bg='blacks.11'>
              <MenuItem py={1} px={3} color='whites.11' fontSize={1}>
                ORDERS
              </MenuItem>
              <MenuItem py={1} px={3} color='whites.11' fontSize={1}>
                NAIL PRODUCTS
              </MenuItem>
              <MenuItem py={1} px={3} color='whites.11' fontSize={1}>
                NAIL CATEGORIES
              </MenuItem>
              <MenuItem py={1} px={3} color='whites.11' fontSize={1}>
                GROUP ORDERS
              </MenuItem>
              <MenuItem py={1} px={3} color='whites.11' fontSize={1}>
                ORDER REVIEWS
              </MenuItem>
            </Box>
          }

          <Box width={1} height='100%' bg='whites.7'>
            <Header width={1} bg='whites.9' color='blacks.2' height={2} display='flex' alignItems='center'>

            </Header>
            {props.children}
          </Box>


        </Container>
      </ThemeProvider>
    );
  }
}

export default Layout;
