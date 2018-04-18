/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { OptionsContainer } from '../atoms/ModalContainer';
import { Checkbox } from '../atoms/Checkbox';

export class ModalOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  // @todo archive is useful for historical research, it does archive the stock so it can still be used for researching
  render() {
    return (
      <OptionsContainer>
        <div style={{ display: 'inline-block', width: '50%' }}>
          <Checkbox type="checkbox" style={{ marginRight: '5px' }} />
          <label>Remove Current Stock</label>
        </div>
        <div
          style={{ display: 'inline-block', width: '50%', paddingLeft: '20px' }}
        >
          <Checkbox type="checkbox" style={{ marginRight: '5px' }} />
          <label>Archive Current Stock</label>
          {/* <label>Validate Stock File</label>*/}
        </div>
      </OptionsContainer>
    );
  }
}

ModalOptions.propTypes = {};

export default ModalOptions;
