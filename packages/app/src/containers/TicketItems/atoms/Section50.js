/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
import {PropTypes} from "react";

export const Section50 = styled.div`
  width: 50%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: table;
  ${(props) => (props.includeStyles ? props.includeStyles : '')};
`;

Section50.propTypes = {
  includeStyles: PropTypes.string,
};

export default Section50;
