import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

const ModalForm = ({ modalShow, setModalShow, heading, message }) => {
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  setShow(modalShow);
  console.log('I am here.', show);
  // const handleShow = () => setShow(true);
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={modalShow} onHide={setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{ heading }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ message }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setModalShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={setModalShow(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalForm
