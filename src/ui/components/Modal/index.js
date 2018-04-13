import React from 'react';
// import messages from './messages';
import Button from 'ui/components/Button';
import PubSub from 'ui/utils/pubsub';
import OverlapLayer from './atoms/OverlapLayer';
import Container from './atoms/Container';
// import BackgroundContainer from './atoms/BackgroundContainer';
import ModalContent from './atoms/ModalContent';
import Divider from './atoms/Divider';
import ModalActions from './atoms/ModalActions';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, content: null };
  }

  componentWillMount() {
    // Subscribe to fuzzy finder lang messages
    this.pubSubToken = PubSub.subscribe(
      PubSub.topics.MODAL_OPENED,
      this.openModal.bind(this)
    );
  }

  componentWillUnmount() {
    // Unsubscribe to fuzzy finder lang messages
    if (this.pubSubToken) PubSub.unsubscribe(this.pubSubToken);
  }

  openModal(topic, content) {
    if (this.state.visible) return;
    this.setState({ visible: true, content }, () => this.props.onOpen());
  }

  fadeOut({ style }, fn) {
    style.opacity = 1;
    (function fade() {
      if ((style.opacity -= 0.1) < 0) {
        style.display = 'none';
        return fn();
      }
      setTimeout(fade, 50);
    }());
  }

  cancel() {
    this.props.onClose();
    this.fadeOut(this.overlap, () => this.setState({ visible: false }));
  }

  render() {
    const ModalCustomContent = this.state.content;
    return (
      this.state.visible && (
        <OverlapLayer innerRef={(overlap) => (this.overlap = overlap)}>
          <Container>
            <ModalContent>
              {ModalCustomContent ? <ModalCustomContent /> : null}
            </ModalContent>
            <Divider />
            <ModalActions>
              <Button onClick={() => this.cancel()} title={'Cancel'} />
              <Button secundary title={'ok'} />
            </ModalActions>
          </Container>
        </OverlapLayer>
      )
    );
  }
}

export default Modal;
