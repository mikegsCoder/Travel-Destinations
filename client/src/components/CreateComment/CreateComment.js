import './CreateComment.css';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as commentService from '../../services/commentService'
import * as dataValidation from '../../services/commentDataValidationService';
import * as constants from '../../constants/constants';
import { useAuthContext } from '../../contexts/AuthContext';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import { useInvalidDataNotificationContext, debounce } from '../../contexts/InvalidDataNotificationContext';
import LoadingSpinner from '../Common/Spinner';

const CreateComment = () => {
    const { user } = useAuthContext();
    const { addNotification } = useApplicationNotificationContext();
    const { destinationId } = useParams();
    const { addInvalidDataNotification } = useInvalidDataNotificationContext();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState('')
    const navigate = useNavigate();

    const onCommentCreate = (e) => {
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

        commentService.createComment(destinationId, commentContent, user.email, user.accessToken)
            .then(() => {
                setIsLoading(false);
                navigate(`/details/${destinationId}`);
                addNotification(constants.appNotificationMessages.commentCreateSuccess, types.success);
            })
            .catch(err => {
                setIsLoading(false);
                addNotification(err, types.danger);
            });
    };

    const onCancelButtonClick = (e) => {
        e.preventDefault();
        navigate(`/details/${destinationId}`);
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

    const addCommentPage = (
        <section id="create-comment-page" className="create">
            <form id="create-comment-form" onSubmit={onCommentCreate} method="POST">
                <fieldset>
                    <legend>Add new Comment</legend>
                    <p className="field">
                        <label htmlFor="comment">Your Comment :</label>
                        <span className="input">
                            <textarea
                                name="comment"
                                id="create-comment-text"
                                spellCheck="false"
                                placeholder="Write comment ..."
                                style={{
                                    borderColor: errors == 'comment'
                                        ? 'red'
                                        : '#666'
                                }}
                                onChange={commentChangeHandler}
                            />
                        </span>
                    </p>
                    <div className="create-comment-buttons">
                        <button type="cancel" className="btn-secondary btn-block" id="cancel-create-btn" onClick={onCancelButtonClick}>Cancel</button>
                        <button type="submit" className="btn-secondary btn-block" id="create-comment-btn">Add Comment</button>
                    </div>
                </fieldset>
            </form>
        </section>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : addCommentPage}
        </>
    );
}

export default CreateComment;