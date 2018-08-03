/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
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
          <Checkbox
            defaultChecked={this.props.removeStockOption}
            type="checkbox"
            style={{ marginRight: '5px' }}
            onChange={(value) =>
              this.props.updateModalOption('removeStock', value)
            }
          />
          <label><FormattedMessage {...messages.modalOptionRemove} /></label>
        </div>
        <div
          style={{ display: 'inline-block', width: '50%', paddingLeft: '20px' }}
        >
          <Checkbox
            type="checkbox"
            defaultChecked={this.props.archiveStockOption}
            style={{ marginRight: '5px' }}
            onChange={(value) =>
              this.props.updateModalOption('archiveStock', value)
            }
          />
          <label><FormattedMessage {...messages.modalOptionArchive} /></label>
          {/* <label>Validate Stock File</label>*/}
        </div>
      </OptionsContainer>
    );
  }
}

ModalOptions.propTypes = {};

export default ModalOptions;
