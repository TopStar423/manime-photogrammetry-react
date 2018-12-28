import { space, width, fontSize, color, height, justifyContent, alignItems, display, fontFamily, fontWeight, boxShadow } from 'styled-system';
import styled from 'styled-components';
import Box from './Box';

export const MX_ROW = 3;
export const ML_ROW_ITEM = 2;
export const ROW_ITEM_WIDTH = 200;

// flex: 1 0 ${(props) => {
//   const index = props.m-1;
//   let margin = 0;
//   if(index >= 0 && index < props.theme.space.length)
//     margin = props.theme.space[props.m-1];
//   return props.children.length * (ROW_ITEM_WIDTH + margin);
// }}px;

const RowItem = styled(Box)`
  white-space: nowrap;
  overflow: hidden;
  font-family: sans-serif;
  font-weight: ${(props) => props.description ? 400 : 200};
  flex: 0 0 ${ROW_ITEM_WIDTH}px;
  height: 80%;
  align-items: center;
  display: flex;
  border: ${(props) => props.selected ? 1 : 0}px solid #313131;
  border-radius: 3px;
  box-sizing: border-box;
  &:hover {
  }
`;

// New Row requires horizontal margins
const Row = styled(Box)`
  display: flex;
  flex-direction: row;
  flex: 0 0 40px;
  align-items: center;
  background-color: ${(props) => props.description ? 'transparent' : '#ffffff'};
  width: ${(props) => {
    const numColumns = props.table.length;
    const width = (props.theme.space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns;
    return width;
  }}px;
  &:hover {
    box-shadow: ${(props) => !props.description ? '0 5px 10px 0 rgba(0,0,0,0.06)' : 'none'};
    transform: ${(props) =>  !props.description ? 'translateY(-1px)' : 'none'};
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  &:focus {
      outline: none;
  }
`;

export const RowJsx = (props) => (
  <Row boxShadow={props.description ? 0 : 2} height={1} my={1} ml={MX_ROW} {...props}>
    {props.children}
  </Row>
);

export const RowItemJsx = ({ before, type, updateField, i, propertyName, ...props }) => (
  <RowItem ml={ML_ROW_ITEM} pl={1} fontSize={1} {...props}>
    { type == 'text' ? <Input value={props.children}></Input>
      : type == 'menu' ? <Input value={props.children}></Input>
      : <Input value={props.children} onChange={(ev) => updateField(i, propertyName, ev.target.value)}></Input>
    }
  </RowItem>
);


// calc(100% - ${(props) => {
//   // console.log(props);
//   console.log(props.theme.space[props.mx]);
//   return 128;
// }}px);
