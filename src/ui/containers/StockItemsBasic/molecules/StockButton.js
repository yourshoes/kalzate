import React from 'react';
import Section5 from '../atoms/Section5';
import StyledButton from '../atoms/StyledButton';

export function StockButton(props) {
  return (
    <Section5>
      <StyledButton {...props} />
    </Section5>
  );
}

export default StockButton;
