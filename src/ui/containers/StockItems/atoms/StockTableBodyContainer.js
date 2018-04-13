import styled from 'styled-components';

export const StockTableBody = styled.div`
  width: ${(props) => (props.content ? 'calc(100% - 5px)' : '100%')};
  /* width: 100%;*/
  height: calc(100% - 88px);
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
`;

export default StockTableBody;
