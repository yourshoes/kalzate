import React from 'react';
import styled from 'styled-components';

export const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const InfoTooltip = styled.div`
  position: relative;
  background: rgba(39,41,44,0.9);
  padding: 10px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 2px;
  transition: all 0.5s ease-in-out;
`;

export default InfoTooltip;
