import React from 'react';
// import styles from './styles.css';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  makeSelectTicketItems,
  makeSelectTicketID,
} from './selectors';
// import { mouseTrap } from 'react-mousetrap';
// import { createStructuredSelector } from 'reselect';
// import { push } from 'react-router-redux';
// import HotKeys from 'ui/utils/hotkeys';
// import PubSub from 'ui/utils/pubsub';
import { loadTicket, searchTickets } from './actions';
// import { selectResources, selectResource } from './selectors';
// import messages from './messages';
import { Container, Menu, MenuFooter, MenuSearch, MenuGroup, MenuItem, MenuTicketListContainer } from './wrappers';

function SidebarMenu(props) {
  const routeName = props.routes[props.routes.length - 1].name;
  return (
    <Container>
      <Menu>
        <MenuGroup static>
          <MenuItem
            title="Home"
            actived={routeName === 'home'}
            to="/"
            highlight
            cursor
          />
          <MenuItem
            title="Settings"
            actived={routeName === 'settings'}
            to="/settings"
            highlight
            cursor
          />
          <MenuItem
            title="Discover"
            actived={routeName === 'discover'}
            to="/discover"
            highlight
            cursor
          />
        </MenuGroup>
        <MenuGroup>
          <MenuItem title="Your Tickets" actived={routeName === 'tickets'} noroute />
          {/**
            <MenuItem title="10001" small highlight cursor />
            <MenuItem title="10002" small highlight cursor />
            <MenuItem title="100013" small highlight cursor />
          **/}
          <MenuTicketListContainer>
            {props.tickets.map((ticket) =>
              (<MenuItem
                key={ticket.created_at}
                title={String(ticket.created_at)}
                selected={ticket.id === props.ticketID}
                onClick={() => {
                  // @todo move to a saga
                  props.loadTicket(ticket);
                  props.router.push('/tickets');
                }}
                state={ticket.state}
                small highlight cursor
              />
              ))}
          </MenuTicketListContainer>
        </MenuGroup>
      </Menu>
      <MenuSearch title="Search Tickets" onChange={(field, value, operator = '$eq') => props.searchTickets(field, value, operator)} />
      <MenuFooter to="/tickets" icon="inbox" title="Cash Drawer" />
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
  tickets: makeSelectTicketItems(),
  ticketID: makeSelectTicketID(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadTicket: (ticket) => dispatch(loadTicket(ticket)),
    searchTickets: (field, value, operator) => dispatch(searchTickets(field, value, operator)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SidebarMenu));

