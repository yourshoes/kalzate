/*
 *
 * TicketTotal
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import TicketPayments from 'ui/containers/TicketPayments';
import { makeSelectTicketPaymentsVisibility } from 'ui/containers/TicketPaymentsContainer/selectors';
import { toggleTicketPaymentsVisibility } from './actions';
import messages from './messages';
import { Container, ContainerSwitcher, Section } from './wrappers';

export function TicketPaymentsContainer(props) {
  // eslint-disable-line react/prefer-stateless-function
  return (
    <Container>
      <ContainerSwitcher
        expanded={props.ticketPaymentsVisibility}
        title="Expand/Collapse Ticket Payments"
        onClick={() => props.toggleTicketPaymentsVisibility()}
      />
      <Section title="Payment Method">
        <TicketPayments />
      </Section>
    </Container>
  );
}

TicketPaymentsContainer.propTypes = {
  toggleTicketPaymentsVisibility: PropTypes.func.isRequired,
  ticketPaymentsVisibility: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  ticketPaymentsVisibility: makeSelectTicketPaymentsVisibility(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleTicketPaymentsVisibility: () =>
      dispatch(toggleTicketPaymentsVisibility()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  TicketPaymentsContainer
);
