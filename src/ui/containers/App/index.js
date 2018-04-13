/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

/* System imports */
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { mouseTrap } from 'react-mousetrap';
import mouseTrapCore from 'mousetrap';

/* Components imports */
import Modal from 'ui/components/Modal';
import SidebarMenu from 'ui/containers/SidebarMenu';
import Footer from 'ui/components/Footer';
import HelperTour from 'ui/components/HelperTour';
import FuzzyFinder from 'ui/containers/FuzzyFinder';
import HotKeys from 'ui/utils/hotkeys';
import PubSub from 'ui/utils/pubsub';
import { Section, Article } from './wrappers';
import messages from './messages';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blur: false };
  }

  componentWillMount() {
    // Subscribe to hotkeys
    this.props.bindShortcut(
      HotKeys.DISCOVER_ACTION.keys,
      this.discoverAction.bind(this)
    );

    // Subscribe to fuzzy finder lang messages
    this.pubSubToken = PubSub.subscribe(
      PubSub.topics.ACTION_SELECTED,
      this.actionSelected.bind(this)
    );
  }

  componentWillUnmount() {
    // Unsubscribe to fuzzy finder lang messages
    if (this.pubSubToken) PubSub.unsubscribe(this.pubSubToken);
  }

  openFuzzyFinder() {
    // Request the fuzzy finder
    PubSub.publish(PubSub.topics.FUZZY_FINDER_REQUIRED, {
      items: [
        {
          value: HotKeys.CHANGE_LANG.keys,
          title: messages.changeLang.id,
          hint: HotKeys.CHANGE_LANG.keys,
        },
        {
          value: HotKeys.ADD_NOTEBOOK.keys,
          title: messages.addNotebook.id,
          hint: HotKeys.ADD_NOTEBOOK.keys,
        },
        {
          value: HotKeys.OPEN_NOTEBOOK.keys,
          title: messages.openNotebook.id,
          hint: HotKeys.OPEN_NOTEBOOK.keys,
        },
      ],
      topic: PubSub.topics.ACTION_SELECTED,
    });
  }

  discoverAction() {
    this.openFuzzyFinder();
    // Prevent default
    return HotKeys.DISCOVER_ACTION.default;
  }

  actionSelected(topic, resource) {
    mouseTrapCore.trigger(resource);
  }

  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - Kalzate"
          defaultTitle="Kalzate"
          meta={[
            {
              name: 'description',
              content: 'Serverless Point Of Sale App For Humans',
            },
          ]}
        />
        <Section blur={this.state.blur}>
          <Article>
            <SidebarMenu />
            {React.Children.toArray(this.props.children)}
          </Article>
          <Footer />
          <FuzzyFinder />
          <HelperTour />
        </Section>
        <Modal
          onOpen={() => this.setState({ blur: true })}
          onClose={() => this.setState({ blur: false })}
        />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  bindShortcut: PropTypes.func,
};

export default mouseTrap(App);
