import React from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';

const swallowingStyled = (WrappedComponent, { swallowProps = [] } = {}) => {
  const Wrapper = ({ children, ...props }) => {
    const propsSwallowed = omit(props, swallowProps);
    return (
      <WrappedComponent {...propsSwallowed}>
        {children}
      </WrappedComponent>
    );
  };
  Wrapper.propTypes = { children: React.PropTypes.object };
  return styled(Wrapper);
};

export default swallowingStyled;
