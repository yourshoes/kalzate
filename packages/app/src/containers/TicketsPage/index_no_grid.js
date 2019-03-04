/*
 *
 * WorkSpacePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { changeResourceSelected } from 'containers/SidebarMenu/actions';
import CashDrawer from 'containers/CashDrawer';
import { selectResources, selectResource } from './selectors';
// import messages from './messages';
import { Container, TicketContainer } from './wrappers';

export class TicketsPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Container>
        <Helmet
          title="Kalzate Ticket"
          meta={[{ name: 'description', content: 'Ticket' }]}
        />
        <TicketContainer />
        <CashDrawer />
      </Container>
    );
  }
}

TicketsPage.propTypes = {
  resources: React.PropTypes.object,
  resourceSelected: React.PropTypes.string,
  changeResourceSelected: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  resources: selectResources(),
  resourceSelected: selectResource(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeResourceSelected: (resource) =>
      dispatch(changeResourceSelected(resource)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsPage);
