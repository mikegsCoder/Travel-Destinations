import './EditComment.css';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as commentService from '../../services/commentService';
import * as dataValidation from '../../services/commentDataValidationService';
import * as constants from '../../constants/constants';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import { useInvalidDataNotificationContext, debounce } from '../../contexts/InvalidDataNotificationContext';
import useCommentState from '../../hooks/useCommentState';
import LoadingSpinner from '../Common/Spinner';

const EditComment = () => {
    const { addNotification } = useApplicationNotificationContext();
    const { commentId } = useParams();
    const { addInvalidDataNotification } = useInvalidDataNotificationContext();
    const [comment, setComment] = useCommentState(commentId);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState('')
    const navigate = useNavigate();

    const onCommentEdit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const commentContent = formData.get('comment');

        const validationResult = dataValidation.commentValidation(commentContent);

        if (validationResult) {
            setErrors('comment');
            addInvalidDataNotification(validationResult);
            return;
        };

        setIsLoading(true);

        let commentData = {
            destinationId: comment.destinationId,
            comment: commentContent,
            userEmail: comment.userEmail
        };

        commentService.editComment(commentId, commentData)
            .then(result => {
                setIsLoading(false);
                addNotification(constants.appNotificationMessages.commentEditSuccess, types.success);
                navigate(`/details/${comment.destinationId}`);
            })
            .catch(err => {
                addNotification(err, types.danger);
                setIsLoading(false);
            });
    };

    const onCancelButtonClick = (e) => {
        e.preventDefault();
        navigate(`/details/${comment.destinationId}`);
    };

    const verifyChangeHandlerData = (value) => {
        const validationResult = dataValidation.commentValidation(value);

        if (validationResult) {
            addInvalidDataNotification(validationResult);
            setErrors('comment');
        } else {
            setErrors('');
        };
    };

    const commentChangeHandler = debounce((e) =>
        verifyChangeHandlerData(e.target.value)
    );

    const editCommentPage = (
        <section id="edit-comment-page" className="create">
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
                                style={{
                                    borderColor: errors == 'comment'
                                        ? 'red'
                                        : '#666'
                                }}
                                defaultValue={comment.comment}
                                onChange={commentChangeHandler}>
                            </textarea>
                        </span>
                    </p>
                    <div className="edit-comment-buttons">
                        <button type="cancel" className="btn-secondary btn-block" id="edit-cancel-create-btn" onClick={onCancelButtonClick}>Cancel</button>
                        <button type="submit" className="btn-secondary btn-block" id="edit-create-comment-btn">Edit Comment</button>
                    </div>
                </fieldset>
            </form>
        </section>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : editCommentPage}
        </>
    );
}

export default EditComment;