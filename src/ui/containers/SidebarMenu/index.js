import React from 'react';
// import styles from './styles.css';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  makeSelectTicketItems,
} from './selectors';
// import { mouseTrap } from 'react-mousetrap';
// import { createStructuredSelector } from 'reselect';
// import { push } from 'react-router-redux';
// import HotKeys from 'ui/utils/hotkeys';
// import PubSub from 'ui/utils/pubsub';
import { loadTicket } from './actions';
// import { selectResources, selectResource } from './selectors';
// import messages from './messages';
import { Container, Menu, MenuFooter, MenuSearch, MenuGroup, MenuItem } from './wrappers';

function SidebarMenu(props) {
  const routeName = props.routes[props.routes.length - 1].name;
  return (
    <Container>
      <Menu>
        <MenuGroup>
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
          <MenuItem title="Your Tickets" actived={routeName === 'tickets'} />
          {/**
            <MenuItem title="10001" small highlight cursor />
          <MenuItem title="10002" small highlight cursor />
          <MenuItem title="100013" small highlight cursor />
          **/}
          {props.tickets.map((ticket) =>
            (<MenuItem
              key={ticket.created_at}
              title={String(ticket.created_at)}
              onClick={() => props.loadTicket(ticket)}
              small highlight cursor
            />
            ))}
        </MenuGroup>
      </Menu>
      <MenuSearch title="Search Tickets" />
      <MenuFooter to="/tickets" icon="inbox" title="New Ticket" />
    </Container>
  );
}

SidebarMenu.propTypes = {
  routes: React.PropTypes.array,
  tickets: React.PropTypes.object,
  loadTicket: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tickets: makeSelectTicketItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadTicket: (ticket) => dispatch(loadTicket(ticket)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SidebarMenu));

