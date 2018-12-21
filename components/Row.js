import { space, width, fontSize, color, height, justifyContent, alignItems, display, fontFamily, fontWeight, boxShadow } from 'styled-system';
import styled from 'styled-components';
import Box from './Box';

// Row and RowItem margins connected
const Row = styled(Box)`
  display: flex;
  align-items: center;
  background: #fff;
  flex: 1 0 ${(props) => {
    const index = props.m-1;
    let margin = 0;
    if(index >= 0 && index < props.theme.space.length)
      margin = props.theme.space[props.m-1];
    return props.children.length * (200 + margin);
  }}px;
  &:hover {
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.06);
    transform: translateY(-1px);
  }
`;

export const RowItem = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  font-family: sans-serif;
  font-weight: ${(props) => props.description ? 400 : 200};
  flex: 0 0 200px;
  &:hover {
  }
`;

export const RowJsx = ({ before, ...props }) => (
  <Box display='flex'>
    <Row p={2} m={3} boxShadow={1} height={1}>
      {props.children}
    </Row>
  </Box>
);
