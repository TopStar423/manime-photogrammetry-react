import { space, width, fontSize, color, height, justifyContent, alignItems, display } from 'styled-system';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';

import Header from './Header';
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
  position: ${props => props.position}
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
            <Box width={1/5} height='100%'>
              Sidemenu
            </Box>
          }

          <Box width={1} height='100%'>
            <Box width={1} bg='blacks.7' color='white' height={2} display='flex' alignItems='center'>
              Orders
            </Box>
            {props.children}
          </Box>


        </Container>
      </ThemeProvider>
    );
  }
}

export default Layout;
