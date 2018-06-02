/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { isEmpty } from 'lodash';
import Center from 'ui/components/Center';
import NotFound from 'ui/components/NotFound';
import TicketBodyContainer from '../atoms/TicketBodyContainer';
import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';
import TicketTable from './TicketTable';

export class TicketBody extends React.Component {

  render() {
    return (
      <TicketBodyContainer>
        {isEmpty(this.props.ticket.items) &&
          <Center>
            <NotFound icon="thumbsdown">
              <Title>
                Ticket empty
          </Title>
              <Subtitle>
                Add some items to this ticket
          </Subtitle>
            </NotFound>
          </Center>}

        {!isEmpty(this.props.ticket.items) && (
          <TicketTable {...this.props} />
        )}
      </TicketBodyContainer>
    );
  }
}

TicketBody.propTypes = {};

export default TicketBody;
