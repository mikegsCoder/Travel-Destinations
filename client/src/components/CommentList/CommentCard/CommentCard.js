import './CommentCard.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as commentService from '../../../services/commentService';
import * as constants from '../../../constants/constants';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useApplicationNotificationContext, types } from '../../../contexts/ApplicationNotificationContext';
import ConfirmDeleteDialog from '../../Common/ConfirmDeleteDialog';

const DestinationCard = ({
    comment
}) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { addNotification } = useApplicationNotificationContext();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const editClickHandler = (e) => {
        e.preventDefault();
        navigate(`/edit-comment/${comment._id}`);
    }

    const deleteClickHandler = (e) => {
        e.preventDefault();
        setShowDeleteDialog(true);
    }

    const deleteHandler = (e) => {
        e.preventDefault();

        commentService.deleteComment(comment._id)
            .then(() => {
                addNotification(constants.appNotificationMessages.commentDeleteSuccess, types.success);
                navigate(`/details/${comment.destinationId}`);
            })
            .catch(err => {
                addNotification(err, types.danger);
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
            <ConfirmDeleteDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} />
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