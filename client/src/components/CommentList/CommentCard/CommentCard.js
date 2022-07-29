import './CommentCard.css';

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuthContext } from '../../../contexts/AuthContext';
import { useNotificationContext, types } from '../../../contexts/NotificationContext';
// import useDestinationState from '../../../hooks/useDestinationState';

import * as destinationService from '../../../services/destinationService';

import ConfirmDialog from '../../Common/ConfirmDialog';


const DestinationCard = ({
    // destination,
    comment
}) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
    // const { commentId } = useParams();
    // const [destination, setDestination] = useDestinationState(destinationId);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const editClickHandler = (e) => {
        e.preventDefault();

        navigate(`/edit-comment/${comment._id}`);
    }

    const deleteClickHandler = (e) => {
        e.preventDefault();

        // let modalText='Are you sure you want to delete this comment?';
        setShowDeleteDialog(true);
    }

    const deleteHandler = (e) => {
        e.preventDefault();

       destinationService.deleteComment(comment._id, user.accessToken)
            .then(() => {
                navigate(`/details/${comment.destinationId}`);
            })
            .finally(() => {
                setShowDeleteDialog(false);
            });
    };

    const commentCardButtons = (
        <div className="comment-card-buttons">
            <button id="edit-comment-btn" onClick={editClickHandler}>Edit</button>
            <button id="delete-comment-btn" onClick={deleteClickHandler}>Delete</button>
        </div>
    );

    return (
        <li >
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} />

            <div className='comment-card' >
                <fieldset>
                    <legend>By: {comment.userEmail}</legend>
                    <div className="field">
                        <span className="comment-content">
                            <textarea disabled spellCheck="false" defaultValue={comment.comment}></textarea>
                        </span>
                    </div>
                    { user?._id == comment._ownerId
                        ? commentCardButtons
                        : null
                    }
                </fieldset>
            </div>
        </li>
    );
}

export default DestinationCard;