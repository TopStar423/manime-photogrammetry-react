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

const Header = styled(Box)`
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
  z-index: 100;
`;

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
            <Sidebar />
          }
          <Box width={[width-150, width-200]} height='100%' bg='whites.7' display='flex' flexDirection='column' fontFamily='sansSerif'>
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
