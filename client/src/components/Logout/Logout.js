import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import * as constants from '../../constants/constants';
import { useAuthContext } from '../../contexts/AuthContext';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import LoadingSpinner from '../Common/Spinner';

const Logout = () => {
    const navigate = useNavigate();
    const { addNotification } = useApplicationNotificationContext();
    const { user, logout } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);

        authService.logout(user.accessToken)
            .then(() => {
                logout();
                setIsLoading(false);
                addNotification(constants.appNotificationMessages.logoutSuccess, types.success);
                navigate('/home-page');
            })
            .catch(err => {
                setIsLoading(false);
                addNotification(err, types.danger);
            });
    }, []);

    return (
        <>
            {isLoading ? <LoadingSpinner /> : null}
        </>
    );
};

export default Logout;