/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  downloadFile,
} from 'containers/App/actions';
import ModalContainer from '../atoms/ModalContainer';
import DropZone from './ModalDropZone';
import Options from './ModalOptions';
import { createStock, updateModalOption } from '../actions';
import {
  makeSelectStockModalRemoveOption,
  makeSelectStockModalArchiveOption,
} from '../selectors';

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
          downloadFile={(...args) => this.props.downloadFile(...args)}
        />
        <Options {...this.props} />
      </ModalContainer>
    );
  }
}

StockModal.propTypes = {};

const mapStateToProps = createStructuredSelector({
  removeStockOption: makeSelectStockModalRemoveOption(),
  archiveStockOption: makeSelectStockModalArchiveOption(),
});

function mapDispatchToProps(dispatch) {
  return {
    createStock: (...args) => dispatch(createStock(...args)),
    updateModalOption: (...args) => dispatch(updateModalOption(...args)),
    downloadFile: (content, fileName, mime) =>
      dispatch(downloadFile({ content, fileName, mime })),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockModal);
