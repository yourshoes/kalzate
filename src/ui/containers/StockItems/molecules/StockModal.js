/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';

export class StockModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p>The modal content goes in here</p>;
  }
}

StockModal.propTypes = {};

export default StockModal;
