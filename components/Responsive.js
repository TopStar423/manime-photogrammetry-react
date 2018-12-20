import styled, { css } from 'styled-components';

// <Row>
//   <Column xs='12' sm='6' md='8' >
//     md: 8 - sm: 6 - xs: 12
//   </Column>
//   <Column xs='6' md='4' backgroundColor="#0000ff">
//     md: 4 - xs: 6
//   </Column>
// </Row>


const sizes = {
  lg: 992,
  md: 768,
  sm: 576,
}

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})

function getWidthString(span) {
  if (!span) return '';

  let width = span / 12 * 100;
  return `width: ${width}%`;
}

export const Row = styled.div`
  &::after {
    content: '';
    clear: both;
    display: table;
  }
`;

export const Column = styled.div`
  float: left;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : '#ff0000'};
  ${({ xs }) => (xs ? getWidthString(xs) : 'width: 100%')};
`;

// @media (max-width: 992px) {
//   ${({lg}) => lg && getWidthString(lg)}
// }
// @media (max-width: 768px) {
//   ${({md}) => md && getWidthString(md)}
// }
// @media (max-width: 576px) {
//   ${({sm}) => sm && getWidthString(sm)}
// }
//
// ${media.lg`${({lg}) => lg && getWidthString(lg)}`};
// ${media.md`${({md}) => md && getWidthString(md)}`};
// ${media.sm`${({sm}) => sm && getWidthString(sm)}`};
//
// @media (min-width: 576px) {
//   ${({ sm }) => sm && getWidthString(sm)};
// }
//
// @media (min-width: 768px) {
//   ${({ md }) => md && getWidthString(md)};
// }
// @media (min-width: 992px) {
//   ${({ lg }) => lg && getWidthString(lg)};
// }
