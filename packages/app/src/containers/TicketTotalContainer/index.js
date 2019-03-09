/*
 *
 * TicketTotal
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import TicketTotal from 'containers/TicketTotal';
import TicketRawTotal from 'containers/TicketRawTotal';
import {
  selectTicketItemsLen,
  makeSelectTicketTotalVisibility,
  makeSelectRawTicketTotalVisibility,
} from 'containers/TicketTotalContainer/selectors';
import { toggleTicketTotalVisibility, toggleRawTicketVisibility } from './actions';
import messages from './messages';
import {
  Container,
  ContainerSwitcher,
  TicketTemplateViewerSwitcher,
  FirstSection,
} from './wrappers';

export function TicketTotalContainer(props) {
  // eslint-disable-line react/prefer-stateless-function
  return (
    <Container>
      <ContainerSwitcher
        expanded={props.ticketTotalVisibility}
        title="Expand/Collapse Ticket Total"
        onClick={() => props.toggleTicketTotalVisibility()}
      />
      {props.ticketItemsLen && (
        <TicketTemplateViewerSwitcher
          expanded={!props.rawTicketTotalVisibility}
          title="Show/Hide Ticket"
          onClick={() => props.toggleRawTicketVisibility()}
        />
      )}
      <FirstSection title={<FormattedMessage {...messages.title} />}>
        {props.rawTicketTotalVisibility ? <TicketRawTotal /> : <TicketTotal />}
      </FirstSection>
    </Container>
  );
}

TicketTotalContainer.propTypes = {
  toggleTicketTotalVisibility: PropTypes.func.isRequired,
  ticketTotalVisibility: PropTypes.bool,
  toggleRawTicketVisibility: PropTypes.func.isRequired,
  rawTicketTotalVisibility: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  ticketTotalVisibility: makeSelectTicketTotalVisibility(),
  rawTicketTotalVisibility: makeSelectRawTicketTotalVisibility(),
  ticketItemsLen: selectTicketItemsLen(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleTicketTotalVisibility: () => dispatch(toggleTicketTotalVisibility()),
    toggleRawTicketVisibility: () => dispatch(toggleRawTicketVisibility()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketTotalContainer);
