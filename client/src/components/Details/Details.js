import './Details.css';

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import * as likeService from '../../services/likeService';
import * as constants from '../../constants/constants';
import { useAuthContext } from '../../contexts/AuthContext';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import useCommentsCountState from '../../hooks/useCommentsCountState';
import useDestinationState from '../../hooks/useDestinationState';
// import useLikeState from '../../hooks/useLikeState';
import useLikesState from '../../hooks/useLikesState';
import ConfirmDeleteDialog from '../Common/ConfirmDeleteDialog';
import LoadingSpinner from '../Common/Spinner';

const Details = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { addNotification } = useApplicationNotificationContext();
    const { destinationId } = useParams();
    const [destination, setDestination] = useDestinationState(destinationId);
    const [likes, setLikes] = useLikesState(destinationId);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [commentsCount, setCommentsCount] = useCommentsCountState(destinationId);
    // const [like, setLike] = useLikeState(destinationId, user._id);

    const deleteHandler = (e) => {
        e.preventDefault();

        setIsDeleteLoading(true);

        destinationService.deleteDestination(destinationId)
            .then(() => {
                setIsDeleteLoading(false);
                addNotification(constants.appNotificationMessages.destinationDeleteSuccess, types.success);
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
        navigate(`/edit/${destinationId}`);
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();
        setShowDeleteDialog(true);
    };

    const viewCommentsClickHandler = (e) => {
        e.preventDefault();
        navigate(`/comments/${destinationId}`);
    };

    const addCommentClickHandler = (e) => {
        e.preventDefault();
        navigate(`/add-comment/${destinationId}`);
    };

    const likeButtonClick = () => {
        likeService.like(user._id, destinationId)
            .then(() => {
                likeService.getDestinationLikes(destinationId)
                    .then(likesResult => {
                        setLikes(likesResult);
                    });
                addNotification(constants.appNotificationMessages.destinationLikeSuccess + destination.title + '.', types.success);
            });
    };

    // const dislikeButtonClick = () => {
    //     // likeService.dislike(destinationId, user._id)
    //     //     .then(() => {
    //     //         likeService.getDestinationLikes(destinationId)
    //     //             .then(likesResult => {
    //     //                 setLikes(likesResult);
    //     //             });
    //     //         addNotification(constants.appNotificationMessages.destinationLikeSuccess + destination.title + '.', types.success);
    //     //     });

    //     console.log(like);
    // };

    const mapClickHandler = (e) => {
        e.preventDefault();
        navigate(`/map/${destinationId}`);
    }

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
            <ConfirmDeleteDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} />

            <section id="details-page" className="details">
                <article id="details-article" className='article-details'>
                    <div className="details-information">
                        <div className='details-heading-wrapper'>
                            <h4>Title: {destination.title}</h4>
                            <p className="category">
                                Category:
                                {
                                    destination.category?.includes('-')
                                        ? ' ' + destination.category.replaceAll("-", " ")
                                        : ' ' + destination.category
                                }
                            </p>
                        </div>
                        <div className="img">
                            <img src={destination.imageUrl} />
                        </div>
                        <div className="actions">
                            {user._id && (user._id == destination._ownerId)
                                ? ownerButtons
                                : userButtons
                            }
                            <div className="likes">
                                <img className="hearts" src="/images/common/heart.gif" />
                                <div id="total-likes">
                                    Likes: {likes?.length}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="destination-description">
                        <div className='description-wrapper'>
                            <h4>Description:</h4>
                            <div className='map-btn-wrapper'>
                                <img src="/images/common/map-btn.png" alt="map-btn" onClick={mapClickHandler} />
                            </div>
                        </div>
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
                            {commentsCount > 0
                                ? <button
                                    className="btn-secondary btn-block"
                                    id="view-comments-btn"
                                    onClick={viewCommentsClickHandler}>
                                    View comments
                                </button>
                                : null
                            }
                            <span id="total-comments">
                                Comments: {commentsCount || 0}
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