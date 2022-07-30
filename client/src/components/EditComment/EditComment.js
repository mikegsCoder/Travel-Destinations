import './EditComment.css';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import useCommentState from '../../hooks/useCommentState';
import { Alert } from 'react-bootstrap';

const Create = () => {
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const { commentId } = useParams();
    const [comment, setComment] = useCommentState(commentId);
    const [errors, setErrors] = useState({name: false})
    const navigate = useNavigate();

    // console.log(comment);

    const onCommentEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const commentContent = formData.get('comment');

        let commentData = {
            destinationId: comment.destinationId,
            comment: commentContent,
            userEmail: comment.userEmail
        }

        // let commentData = Object.fromEntries(new FormData(e.currentTarget));

        destinationService.editComment(commentId, commentData)
            .then(navigate(`/details/${comment.destinationId}`)); // add notification?
    }

    const onCancelButtonClick = (e) => {
        e.preventDefault();
        navigate(`/details/${comment.destinationId}`);
    }

    const commentChangeHandler = (e) => {
        let currentComment = e.target.value;

        if (currentComment.length < 3) {
            setErrors(state => ({...state, name: 'Comment should be at least 3 characters!'}))
        } else if (currentComment.length > 300) {
            setErrors(state => ({...state, name: 'Comment should be max 300 characters!'}))
        } else {
            setErrors(state => ({...state, name: false}))
        }
    }

    return (
        <section id="edit-comment-page" className="create">
            <Alert variant="danger" show={errors.name}>{errors.name}</Alert>
            
            <form id="edit-comment-form" onSubmit={onCommentEdit} method="PUT">
                <fieldset>
                    <legend>Edit Comment</legend>
                    <p className="field">
                        <label htmlFor="comment">Comment :</label>
                        <span className="input">
                            <textarea 
                                name="comment" 
                                id="edit-comment-text" 
                                spellCheck="false" 
                                defaultValue={comment.comment} 
                                onChange={commentChangeHandler}>
                            </textarea>
                        </span>
                    </p>
                    <div className="edit-comment-buttons">
                        <button type="cancel" id="edit-cancel-create-btn" onClick={onCancelButtonClick}>Cancel</button>
                        <button type="submit" id="edit-create-comment-btn">Edit Comment</button>
                    </div>
                </fieldset>
            </form>
        </section>
    );
}

export default Create;