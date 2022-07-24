import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

const Logout = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotificationContext();
    const { user, logout } = useAuthContext();
    
    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                logout();
                addNotification('You are loged out', types.success);
                
                navigate('/home-page');
            })
    }, [])

    return null;
};

export default Logout;