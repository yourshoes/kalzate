/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStock } from '../actions';
import ModalContainer from '../atoms/ModalContainer';
import DropZone from './ModalDropZone';
import Options from './ModalOptions';

export class StockModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ModalContainer>
        <DropZone
          enable={() => this.props.disableNext(false)}
          disable={() => this.props.disableNext()}
          onApproved={(...args) => this.props.onApproved(...args)}
          {...this.props}
        />
        <Options />
      </ModalContainer>
    );
  }
}

StockModal.propTypes = {};

const mapStateToProps = null;

function mapDispatchToProps(dispatch) {
  return {
    createStock: (...args) => dispatch(createStock(...args)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockModal);
