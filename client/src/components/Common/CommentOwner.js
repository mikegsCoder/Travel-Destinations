import { useContext } from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import useCommentState from '../../hooks/useCommentState';
import LoadingSpinner from '../Common/Spinner';

const CommentOwner = ({ children }) => {
    const { user, isAuthenticated } = useAuthContext();
    const { commentId } = useParams();
    const [comment, setComment] = useCommentState(commentId);

    if (comment._ownerId){
        if (!isAuthenticated || user._id !== comment._ownerId) {
            return <Navigate to="/" replace />
        } else {
            return  children ? children : <Outlet />
        };
    } else {
        return <LoadingSpinner />
    };
};

export default CommentOwner;