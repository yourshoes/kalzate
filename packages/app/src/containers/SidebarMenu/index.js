import React from 'react';
// import styles from './styles.css';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { ticketList } from 'selectors/tickets';
import { makeSelectTicketID } from './selectors';
import {
  settings
} from 'selectors/settings';
// import { mouseTrap } from 'react-mousetrap';
// import { createStructuredSelector } from 'reselect';
// import { push } from 'react-router-redux';
// import HotKeys from 'utils/hotkeys';
// import PubSub from 'utils/pubsub';
import { searchTickets } from './actions';
import { loadTicket, printDailySummaryTicket } from 'actions/tickets';
// import { selectResources, selectResource } from './selectors';
import messages from './messages';
import {
  Container,
  Menu,
  MenuFooter,
  MenuSearch,
  MenuGroup,
  MenuItem,
  MenuTicketListContainer,
} from './wrappers';
import { tickets as ticketsSelectors } from '@kalzate/cy';

function SidebarMenu(props) {
  const routeName = props.routes[props.routes.length - 1].name;
  return (
    <Container>
      <Menu>
        <MenuGroup static>
          <MenuItem actived={routeName === 'home'} to="/" highlight cursor>
            <FormattedMessage {...messages.home} />
          </MenuItem>
          <MenuItem actived={routeName === 'settings'} to="/settings" highlight cursor>
            <FormattedMessage {...messages.settings} />
          </MenuItem>
          <MenuItem actived={routeName === 'discover'} highlight cursor disabled>
            <FormattedMessage {...messages.discover} />
          </MenuItem>
          {/* <MenuItem actived={routeName === 'discover'} to="/discover" highlight cursor>
            <FormattedMessage {...messages.discover} />
          </MenuItem> */}
        </MenuGroup>
        <MenuGroup>
          <MenuItem actived={routeName === 'tickets'} to="/tickets" highlight cursor>
            <FormattedMessage {...messages.tickets} />
          </MenuItem>

          {/**
            <MenuItem title="10001" small highlight cursor />
            <MenuItem title="10002" small highlight cursor />
            <MenuItem title="100013" small highlight cursor />
          **/}
          <MenuTicketListContainer data-cy={ticketsSelectors.TICKETS_LIST}>
            {props.ticketList.items.map((ticket) => (
              <MenuItem
                key={ticket.created_at}
                selected={ticket.id === props.ticketID}
                onClick={() => {
                  // @todo move to a saga
                  props.loadTicket(ticket.id);
                  props.router.push('/tickets');
                }}
                state={ticket.balance}
                small
                highlight
                cursor
              >
                {String(ticket.created_at)}
              </MenuItem>
            ))}
          </MenuTicketListContainer>
        </MenuGroup>
      </Menu>
      {/* <MenuSearch
        onChange={(field, value, operator = '$eq') => props.searchTickets(field, value, operator)}
      /> */}
      <MenuFooter to="/tickets" icon="inbox" onClick={() => {
        props.printDailySummaryTicket(props.settings);
      }}>
        <FormattedMessage {...messages.cashDrawer} />
      </MenuFooter>
    </Container>
  );
}

SidebarMenu.propTypes = {
  routes: React.PropTypes.array,
  tickets: React.PropTypes.array,
  ticketID: React.PropTypes.string,
  loadTicket: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ticketList,
  settings,
  ticketID: makeSelectTicketID(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadTicket: (ticket) => dispatch(loadTicket(ticket)),
    searchTickets: (field, value, operator) => dispatch(searchTickets(field, value, operator)),
    printDailySummaryTicket: (settings) => dispatch(printDailySummaryTicket(settings)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SidebarMenu));
