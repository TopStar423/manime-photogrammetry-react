import {
  space,
  height,
  width,
  fontSize,
  color,
  display,
  flex,
  flexWrap,
  flexDirection,
  flexBasis,
  alignSelf,
  justifySelf,
  alignItems,
  justifyContent,
  background,
  backgroundImage,
  backgroundSize,
  backgroundRepeat,
  borderRadius,
  borderColor,
  borders,
  boxShadow,
  opacity,
  overflow,
  position,
  zIndex,
  top,
  left,
  bottom,
  right,
  fontFamily,
  fontWeight,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  size,
  ratio
} from 'styled-system';
import styled from 'styled-components';

export const RefreshButton = styled.button`
  ${space}
  color: #fff;
  background-color: #14aaf5;
  border-radius: 3px;
  border: none;
  width: 70px;
  height: 25px;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #1299dc;
  }
  &:active {
    background-color: #1088c4;
  }
`;
