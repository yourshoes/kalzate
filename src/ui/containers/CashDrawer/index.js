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
import PaymentSummary from 'ui/containers/PaymentSummary';
import {
  Container,
  GlobalScroll,
  ContainerSwitcher,
  Section,
  FirstSection,
  // TicketPaymentSummary,
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
        <FirstSection title="Payment Summary">
          <PaymentSummary />
        </FirstSection>
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
