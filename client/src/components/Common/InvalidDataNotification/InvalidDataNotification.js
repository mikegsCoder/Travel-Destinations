import './InvalidDataNotification.css';

import { Alert } from 'react-bootstrap';
import { useInvalidDataNotificationContext } from '../../../contexts/InvalidDataNotificationContext';

const InvalidDataNotification = () =>{
    const { errors } = useInvalidDataNotificationContext();

    if (!errors) {
        return null;
    };

    return(
        <Alert variant="danger" show={errors.name.length > 0}>{errors.name}</Alert>
    );
};

export default InvalidDataNotification;