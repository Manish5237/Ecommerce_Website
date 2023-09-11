import React from "react";
import { Modal, Button } from 'react-bootstrap';

const DeleteCategoryModal = (props) => {

    const {
        show,
        handleClose,
        hide,
        checkedArray
    } = props;

    return (
        <Modal show={show} onHide={() => hide(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Marked for Delete</h5>
                {checkedArray.map((item, index) => <span key={index}>{item.name + ", "}</span>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => hide(false)}>
                    No
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteCategoryModal;