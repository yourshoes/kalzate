/*
 *
 * TicketTotal
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import TicketTotal from 'ui/containers/TicketTotal';
import { makeSelectTicketTotalVisibility } from 'ui/containers/TicketTotalContainer/selectors';
import { toggleTicketTotalVisibility } from './actions';
import messages from './messages';
import { Container, ContainerSwitcher, FirstSection } from './wrappers';

export function TicketTotalContainer(props) {
  // eslint-disable-line react/prefer-stateless-function
  return (
    <Container>
      <ContainerSwitcher
        expanded={props.ticketTotalVisibility}
        title="Expand/Collapse Ticket Total"
        onClick={() => props.toggleTicketTotalVisibility()}
      />
      <FirstSection title="Payment Summary">
        <TicketTotal />
      </FirstSection>
    </Container>
  );
}

TicketTotalContainer.propTypes = {
  toggleTicketTotalVisibility: PropTypes.func.isRequired,
  ticketTotalVisibility: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  ticketTotalVisibility: makeSelectTicketTotalVisibility(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleTicketTotalVisibility: () => dispatch(toggleTicketTotalVisibility()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  TicketTotalContainer
);
