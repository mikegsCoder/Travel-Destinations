import './ApplicationNotification.css';

import { Toast } from 'react-bootstrap';
import { useApplicationNotificationContext } from '../../../contexts/ApplicationNotificationContext';

const ApplicationNotification = () => {
    const { notification, hideNotification } = useApplicationNotificationContext();

    if (!notification.show) {
        return null;
    };

    return (
        <Toast className="notification d-inline-block m-1" bg={notification.type} onClose={hideNotification}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Travel Destinations</strong>
                <small>
                    {notification.type == 'danger' ? 'error' : notification.type}
                </small>
            </Toast.Header>
            <Toast.Body>
                {notification.message}
            </Toast.Body>
        </Toast>
    );
};

export default ApplicationNotification;