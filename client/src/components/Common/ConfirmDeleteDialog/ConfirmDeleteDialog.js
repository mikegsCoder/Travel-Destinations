import { Modal, Button } from 'react-bootstrap';
import './ConfirmDialog.css';

const ConfirmDialog = ({
    show,
    onClose,
    onSave,
    // modalTitle,
    // modalText
}) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete Action!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure that you want to delete this item?</p>
                {/* <p>Modal body text goes here.</p> */}
                {/* <p>{modalText}</p> */}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={onSave}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDialog;
