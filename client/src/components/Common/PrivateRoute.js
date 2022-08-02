import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({
    children
}) => {
    const { user } = useAuthContext();

    return user.email ? children : <Navigate to="/login" replace/> // add replace!
};

export default PrivateRoute;