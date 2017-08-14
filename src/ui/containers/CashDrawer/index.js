/**
*
* BlogPost
*
*/

import React from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectBlogPostVisibility } from 'ui/containers/CashDrawer/selectors';
import { toggleBlogPostVisibility } from 'ui/containers/CashDrawer/actions';
// import messages from './messages';
import {
  Container,
  GlobalScroll,
  ContainerSwitcher,
  Section,
  TicketPaymentSummary,
  PaymentMethods,
} from './wrappers';

function CashDrawer(props) {
  return (
    <Container expanded={props.blogPostVisibility}>
      <ContainerSwitcher
        expanded={props.blogPostVisibility}
        title="Expand/Collapse Tutorial"
        onClick={() => props.toggleBlogPostVisibility()}
      />

      <GlobalScroll>
        <Section title="Payment Summary">
          <TicketPaymentSummary total={17.98} take={20.0} returns={2.02} />
        </Section>
        <Section title="Payment Method">
          <PaymentMethods />
        </Section>
      </GlobalScroll>
    </Container>
  );
}

CashDrawer.propTypes = {
  blogPostVisibility: React.PropTypes.bool,
  toggleBlogPostVisibility: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  blogPostVisibility: selectBlogPostVisibility(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleBlogPostVisibility: () => dispatch(toggleBlogPostVisibility()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CashDrawer);
