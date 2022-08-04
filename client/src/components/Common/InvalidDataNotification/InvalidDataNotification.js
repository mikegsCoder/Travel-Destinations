import './InvalidDataNotification.css';

import { useInvalidDataNotificationContext } from '../../../contexts/InvalidDataNotificationContext';
import { Alert } from 'react-bootstrap';

const InvalidDataNotification = () =>{
    const { errors } = useInvalidDataNotificationContext();

    if (!errors) {
        return null;
    }

    return(
        <Alert variant="danger" show={errors.name.length > 0}>{errors.name}</Alert>
    )
}

export default InvalidDataNotification;