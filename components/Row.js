import { space, width, fontSize, color, height, justifyContent, alignItems, display, fontFamily, fontWeight, boxShadow } from 'styled-system';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../utils/theme';

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
  ${boxShadow}
  position: ${props => props.position};
`;

const Row = styled(Box)`
  display: flex;
  align-items: center;
  font-family: sans-serif;
  font-weight: 200;
  background: transparent;
  &:hover {
    background: rgba(255,255,255,.1);
  }
`;

const RowJsx = ({ before, ...props }) => (
  <Row fontSize={2} p={2} m={3} boxShadow={1} height={1}>
    {props.children}
  </Row>
);

export default RowJsx;
