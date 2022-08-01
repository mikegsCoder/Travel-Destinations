import './ConfirmDeleteDialog.css';

import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteDialog = ({
    show,
    onClose,
    onSave,
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete Action!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure that you want to delete this item?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={onSave}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteDialog;
