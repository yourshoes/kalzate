import styled from 'styled-components';

export const OverlapLayer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99999;
  display: block;
  pointer-events: auto;
  width: 100%;
  height: 100%;
`;

export default OverlapLayer;
