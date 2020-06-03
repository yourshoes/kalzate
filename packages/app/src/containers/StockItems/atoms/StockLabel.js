import styled from 'styled-components';

export const StockLabel = styled.label`
  position: absolute;
  pointer-events: none; // makes the input ot get focus having the label on top of it
  left: 0;
  top: ${(props) => (props.readonly ? '.35em' : '0')};
  cursor: text;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
  opacity: ${(props) => (props.readonly ? '.5' : '1')};
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  margin-left: 10px;
  font-size: ${(props) => (props.readonly ? '1.7em' : '14px')};
  user-select: none;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default StockLabel;
