import { space, width, fontSize, color, height, justifyContent, alignItems, display, fontFamily, fontWeight, boxShadow } from 'styled-system';
import styled from 'styled-components';
import Box from './Box';
import { connect } from 'react-redux';
import activeElement from '../reducers';
import { setActiveElement } from '../actions';


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
  font-weight: ${(props) => props.description ? 400 : 200};
  flex: 0 0 ${ROW_ITEM_WIDTH}px;
  height: 80%;
  align-items: center;
  display: flex;
  border-radius: 3px;
  box-sizing: border-box;
`;
// border: ${(props) => props.selected ? 1 : 0}px solid #313131;


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
  ${space}
  ${fontSize}
  font-weight: ${(props) => props.description ? 400 : 200};
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
    border: 1px solid #313131;
  }
`;

export const RowJsx = (props) => (
  <Row boxShadow={props.description ? 0 : 2} height={1} my={1} ml={MX_ROW} {...props}>
    {props.children}
  </Row>
);

// export const RowItemJsx = ({ before, type, updateField, i, fieldNum, propertyName, selectedField, ...props }) => (
//   <RowItem ml={ML_ROW_ITEM} pl={1} selected={selectedField == fieldNum && type != 'display' ? true : false} {...props}>
//     { type == 'text' ? <Input fontSize={1} value={props.children ? props.children : ''} onChange={(ev) => updateField(i, propertyName, ev.target.value)}></Input>
//       : type == 'menu' ? <Input value={props.children}></Input>
//       : <Box fontSize={1}>{props.children}</Box>
//     }
//   </RowItem>
// );

class RowItemClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyValue: this.props.children ? this.props.children : ''
    };
  }

  rowItemClick = async () => {
    const boundingRect = this._ref.getBoundingClientRect();
    // if (this.props.selectField)
    //   this.props.selectField(this.props.fieldNum, this.props.type, this._ref.getBoundingClientRect());
    this.props.setActiveElement({id: this.props.id, fieldNum: this.props.fieldNum, propertyName: this.props.propertyName, type: this.props.type, top: boundingRect.top, left: boundingRect.left, right: boundingRect.right, bottom: boundingRect.bottom, options: []});
  }

  updateField = (index, propertyName, propertyValue) => {
    this.setState({ propertyValue });
    this.props.updateField(this.props.id, propertyName, propertyValue);
  }

  render() {
    const { before, type, updateField, i, fieldNum, propertyName, selectField, selectedField, ...props } = this.props;
    const { activeElement } = this.props;

    // Temp before redux
    const imagePath = this.props.activeElement.fieldNum == this.props.fieldNum && this.props.activeElement.imagePath ? this.props.activeElement.imagePath : props.children;

    return (
      <RowItem ref={(ref)=> this._ref = ref} ml={ML_ROW_ITEM} {...props} onClick={this.rowItemClick}>
        { type == 'text' ? <Input pl={2} fontSize={1} value={this.state.propertyValue} onChange={(ev) => this.updateField(fieldNum, propertyName, ev.target.value)}></Input>
          : type == 'menu' ? <Input pl={2} value={this.state.propertyValue} onChange={() => {}}></Input>
          : type == 'image' ? <Box fontSize={1} onClick={(ev) => this.updateField(fieldNum, propertyName, imagePath)}>{imagePath}</Box>
          : <Box fontSize={1}>{props.children}</Box>
        }

      </RowItem>
    );
  }
}

// <svg width="24" height="24" viewBox="0 0 24 24"><path fill='#a1a1a1' d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/><path d="M0 0h24v24H0z" fill="none"/></svg>

const mapStateToProps = state => ({
  ...activeElement(state, '')
})

const mapDispatchToProps = dispatch => ({
  setActiveElement: element => dispatch(setActiveElement(element))
})

export const RowItemComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RowItemClass);
