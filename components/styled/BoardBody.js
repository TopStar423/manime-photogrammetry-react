import styled from 'styled-components';
import Box from '../Box';

const MX_ROW = 3;
const ML_ROW_ITEM = 2;
const ROW_ITEM_WIDTH = 220;

export const BoardBody = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  background-color: #fafafa;
`;

export const BoardBodyOptions = styled(Box)`
  display: flex;
  flex-direction: row;
  width: ${(props) => {
    const numColumns = props.table.length;
    const width = (props.theme.space[MX_ROW] * 2) + ((props.theme.space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns);
    return width;
  }}px;
  padding-top: 32px;
  padding-bottom: 24px;
`;

// BoardBodyContents needs table prop
export const BoardBodyContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1 0 100%;
  overflow-x: scroll;
  ${'' /* width: ${(props) => {
    const numColumns = props.table.length;
    const width = (props.theme.space[MX_ROW] * 2) + ((props.theme.space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns);
    return width;
  }}px; */}
  background-color: transparent;
`;

export const BoardBodyContentDescriptions = styled(Box)`
  width: ${(props) => {
    const numColumns = props.table.length;
    const width = (props.theme.space[MX_ROW] * 2) + ((props.theme.space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns);
    return width;
  }}px;
  padding-bottom: 12px;
  padding-left: 40px;
`;

export const BoardBodyContents = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  height: 1px;
  min-height: 1px;
  overflow-y: auto;
  overflow-x: hidden;
  direction: rtl;
  width: ${(props) => {
    const numColumns = props.table.length;
    const width = (props.theme.space[MX_ROW] * 2) + ((props.theme.space[ML_ROW_ITEM] + ROW_ITEM_WIDTH) * numColumns);
    return width;
  }}px;
  overflow-x: auto;
`;

export const AnalyticsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    padding: 10px 20px;
    margin-top: -25px;
`;

export const AnalyticsHeader = styled.h3`
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
`;

export const AnalyticsContents = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AnalyticsItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
`;

export const AnalyticsTotal = styled.div`
    font-weight: 700;
    background-color: #f7bfa0;
`;

export const LoadingContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
