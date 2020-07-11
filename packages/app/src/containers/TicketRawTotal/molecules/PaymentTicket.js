/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { compileTicket } from 'utils/receipt';
import Pre from '../atoms/Pre';

export function PaymentTicket({ settings, ticket }) {
  const ticketTemplate = compileTicket(settings, ticket);
  // const ticketTemplate = compileTicket(settings, { ...ticket, created_at: new Date().getTime() });
  return <Pre style={{ fontFamily: 'monospace', overflowY: 'auto' }}>{ticketTemplate}</Pre>;
}

PaymentTicket.propTypes = {};

export default PaymentTicket;
