/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import TicketTableBodyContainer from '../atoms/TicketTableBodyContainer';
import HeightAdapterContainer from '../atoms/HeightAdapterContainer';
import TicketTableRowContainer from '../atoms/TicketTableRowContainer';
import TicketTableField from './TicketTableField';
import TicketTableButton from './TicketTableButton';

export class TicketTableBody extends React.Component {

  abbrv(type, value) {
    switch (type) {
      case 'COLORS':
      case 'GENDER':
      case 'BRAND':
        return value.substring(0, 3);
      default: return value;
    }
  }

  render() {
    return (
      <HeightAdapterContainer>
        <TicketTableBodyContainer>
          {this.props.items.map((item, i) => (
            <TicketTableRowContainer key={i} even={(i + 1) % 2}>
              <TicketTableField placeholder={item.reference} readonly />
              <TicketTableField placeholder={`${this.abbrv('BRAND', item.brand)}-${item.colors.map((c) => this.abbrv('COLORS', c)).join()} (${item.size}-${this.abbrv('BRAND', item.gender)})`} readonly bigger />
              <TicketTableField placeholder={item.price} readonly />
              <TicketTableField placeholder={'1'} />
              <TicketTableField placeholder={item.price} readonly />
              <TicketTableButton primary icon="remove-close" />
            </TicketTableRowContainer>
          ))}
        </TicketTableBodyContainer>
      </HeightAdapterContainer>
    );
  }
}

TicketTableBody.propTypes = {};

export default TicketTableBody;
