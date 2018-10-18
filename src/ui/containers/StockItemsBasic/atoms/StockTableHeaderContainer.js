import styled from 'styled-components';

export const StockTableHeader = styled.div`
  width: ${(props) => (props.content ? 'calc(100% - 5px)' : '100%')};
  height: 44px;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  background-color: ${(props) =>
    props.even ? props.theme.tables.bgColorEven : props.theme.tables.bgColor};
  color: ${(props) => (props.even ? props.theme.tables.colorEven : props.theme.tables.color)};
  ${(props) => (props.unValid ? '& input:required { &:placeholder-shown:not(:focus) + * { color: red; opacity:.9}}' :'')}
`;

export default StockTableHeader;
