import './CreateComment.css';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import { Alert } from 'react-bootstrap';
import LoadingSpinner from '../Common/Spinner';
// import useDestinationState from '../../hooks/useDestinationState';

const CreateComment = () => {
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const { destinationId } = useParams();
    const [errors, setErrors] = useState({ name: false })
    const [isLoading, setIsLoading] = useState(false);
    // const [destination, setDestination] = useDestinationState(destinationId);
    const navigate = useNavigate();

    const onCommentCreate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const comment = formData.get('comment');

        setIsLoading(true);

        destinationService.createComment(destinationId, comment, user.email, user.accessToken)
            .then(() => {
                setIsLoading(false);
                navigate(`/details/${destinationId}`);
                addNotification('Successfully commented destination!', types.success);
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

    const commentChangeHandler = (e) => {
        let currentComment = e.target.value;

        if (currentComment.length < 3) {
            setErrors(state => ({ ...state, name: 'Comment should be at least 3 characters!' }))
        } else if (currentComment.length > 300) {
            setErrors(state => ({ ...state, name: 'Comment should be max 300 characters!' }))
        } else {
            setErrors(state => ({ ...state, name: false }))
        }
    };

    const addCommentPage = (
        <section id="create-comment-page" className="create">
            <Alert variant="danger" show={errors.name}>{errors.name}</Alert>

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