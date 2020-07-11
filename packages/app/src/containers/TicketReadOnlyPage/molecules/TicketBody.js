/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import Center from 'components/Center';
import NotFound from 'components/NotFound';
import TicketBodyContainer from '../atoms/TicketBodyContainer';
import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';
import TicketTable from './TicketTable';
import messages from '../messages';

export class TicketBody extends React.Component {

  render() {
    return (
      <TicketBodyContainer>
        {this.props.isEmptyTicket &&
          <Center>
            <NotFound icon="thumbsdown">
              <Title>
                <FormattedMessage {...messages.notFound} />
              </Title>
              <Subtitle>
                <FormattedMessage {...messages.notFoundHelp} />
              </Subtitle>
            </NotFound>
          </Center>}

        {!this.props.isEmptyTicket && (
          <TicketTable {...this.props} />
        )}
      </TicketBodyContainer>
    );
  }
}

TicketBody.propTypes = {};

export default TicketBody;
