import './Details.css';

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import * as likeService from '../../services/likeService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import useDestinationState from '../../hooks/useDestinationState';
import useCommentsState from '../../hooks/useCommentsState';
import useLikesState from '../../hooks/useLikesState';
import ConfirmDialog from '../Common/ConfirmDialog';
import LoadingSpinner from '../Common/Spinner';

const Details = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const { destinationId } = useParams();
    const [destination, setDestination] = useDestinationState(destinationId);
    const [comments, setComments] = useCommentsState(destinationId);
    const [likes, setLikes] = useLikesState(destinationId);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    // const [isDataLoading, setIsDataLoading] = useState(false);
    // const [isCommentsLoading, setIsCommentsLoading] = useState(false);
    // const [isLikesLoading, setIsLikesLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    // console.log(destinationId);

    const deleteHandler = (e) => {
        e.preventDefault();

        setIsDeleteLoading(true);

        destinationService.deleteDestination(destinationId, user.accessToken)
            .then(() => {
                setIsDeleteLoading(false);
                addNotification('Destination successfully deleted.', types.success);
                navigate('/home-page');
            })
            .catch(err => {
                setIsDeleteLoading(false);
                addNotification(err, types.danger);
            })
            .finally(() => {
                setIsDeleteLoading(false);
                setShowDeleteDialog(false);
            });
    };

    const editClickHandler = (e) => {
        e.preventDefault();

        // console.log(destinationId);
        navigate(`/edit/${destinationId}`);
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();

        // console.log(process.env.NODE_ENV);
        setShowDeleteDialog(true);
    };

    const viewCommentsClickHandler = (e) => {
        e.preventDefault();

        navigate(`/comments/${destinationId}`);
    };

    const addCommentClickHandler = (e) => {
        e.preventDefault();

        navigate(`/add-comment/${destinationId}`)
    };

    const likeButtonClick = () => {
        // if (user._id === destination._ownerId) {
        //     return;
        // }

        // if (destination.likes.includes(user._id)) {
        //     addNotification('You cannot like again')
        //     return;
        // }

        likeService.like(user._id, destinationId)
            .then(() => {
                // setDestination(state => ({ ...state, likes: [...state.likes, user._id] }));
                likeService.getDestinationLikes(destinationId)
                    .then(likesResult => {
                        setLikes(likesResult);
                    })

                addNotification(`Successfuly liked ${destination.title}`, types.success);
            });
    };
    
    // const userButtons = (!destination.likes?.includes(user._id)
    //     ? <button className="btn-secondary btn-block"
    //         id="like-btn"
    //         onClick={likeButtonClick}>
    //         Like
    //     </button>
    //     : null
    // )

    const userButtons = (
        user._id && !Array.from(likes)?.includes(user._id)
        ? <button className="btn-secondary btn-block"
                id="like-btn"
                onClick={likeButtonClick}>
                Like
            </button>
        : null
    )

    const ownerButtons = (
        <>
            <button
                className="btn-secondary btn-block"
                id="edit-btn"
                onClick={editClickHandler}>
                Edit
            </button>
            <button
                className="btn-secondary btn-block"
                id="delete-btn"
                onClick={deleteClickHandler}>
                Delete
            </button>
        </>
    );

    const addCommentBtn = (
        <button
            className="btn-secondary btn-block"
            id="add-comment-btn"
            onClick={addCommentClickHandler}>
            Add comment
        </button>
    );

    const detailsPage = (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} />

            <section id="details-page" className="details">
                <article id="details-article" className='article-details'>
                    <div className="details-information">
                        <h4>Title: {destination.title}</h4>
                        <p className="category">
                            Category: 
                            {
                                destination.category?.includes('-')
                                    ? ' ' + destination.category.replaceAll("-", " ")
                                    : ' ' + destination.category
                            }
                        </p>
                        <p className="img"><img src={destination.imageUrl} /></p>
                        <div className="actions">
                            {user._id && (user._id == destination._ownerId)
                                ? ownerButtons
                                : userButtons
                            }
                            <div className="likes">
                                <img className="hearts" src="/images/common/heart.gif" />
                                <div id="total-likes">
                                    {/* Likes: {destination.likes?.length || 0} */}
                                    Likes: {likes?.length}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="destination-description">
                        <h4>Description:</h4>
                        <textarea
                            disabled={true}
                            spellCheck={false}
                            defaultValue={destination.description}
                        />
                        <div className="comments-section">
                            {user._id
                                ? addCommentBtn
                                : null
                            }
                            {/* {destination.comments?.length > 0 */}
                            {comments?.length > 0
                                ? <button
                                    className="btn-secondary btn-block"
                                    id="view-comments-btn"
                                    onClick={viewCommentsClickHandler}>
                                    View comments
                                </button>
                                : null
                            }
                            <span id="total-comments">
                                {/* Comments : {destination.comments?.length || 0} */}
                                Comments : {comments?.length || 0}
                            </span>
                        </div>
                    </div>
                </article>
            </section>
        </>
    );

    return (
        <>
            {
                (isDeleteLoading)
                    ? <LoadingSpinner />
                    : detailsPage
            }
        </>
    );
}

export default Details;