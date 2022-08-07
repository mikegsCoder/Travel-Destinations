import { useContext } from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import useDestinationState from '../../hooks/useDestinationState';
import LoadingSpinner from '../Common/Spinner';

const DestinationOwner = ({ children }) => {
    const { user, isAuthenticated } = useAuthContext();
    const { destinationId } = useParams();
    const [destination, setDestination] = useDestinationState(destinationId);

    if (destination._ownerId){
        if (!isAuthenticated || user._id !== destination._ownerId) {
            return <Navigate to="/" replace />
        } else {
            return  children ? children : <Outlet />
        };
    } else {
        return <LoadingSpinner />
    };
};

export default DestinationOwner;