/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { compileTicket } from 'utils/ticket';
import Pre from '../atoms/Pre';

function tikcetIsUpdated(ticket) {
  return ticket.items.some((item) => item.added || item.amount_return > 0);
}

export function PaymentTicket({ settings, ticket, isReadOnly }) {
  const ticketTemplate =
    isReadOnly || !tikcetIsUpdated(ticket)
      ? ticket.printed
      : compileTicket(settings, { ...ticket, created_at: new Date().getTime() });
  // const ticketTemplate = compileTicket(settings, { ...ticket, created_at: new Date().getTime() });
  return <Pre style={{ fontFamily: 'monospace', overflowY: 'auto' }}>{ticketTemplate}</Pre>;
}

PaymentTicket.propTypes = {};

export default PaymentTicket;
