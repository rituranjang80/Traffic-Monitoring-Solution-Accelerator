import React, { PureComponent } from 'react';
import { Button, Modal } from 'react-bootstrap';

export class Popup extends PureComponent {
  render() {
    const {
      isOpen,
      toggleShow,
      onConfirm,
      textMessage,
      headingText,
      btnaction,
      btnclose,
    } = this.props;

    return (
      <Modal
        backdrop="static"
        keyboard={false}
        id="delModal"
        show={isOpen}
        onHide={toggleShow}
      >
        <Modal.Header closeButton>{headingText}</Modal.Header>

        <Modal.Body>
          <p>{textMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirm}>
            {btnaction}
          </Button>
          <Button variant="secondary" onClick={toggleShow}>
            {btnclose}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
