import './ProfileStatistics.css'

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import * as likeService from '../../services/likeService';
import * as commentService from '../../services/commentService';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/Spinner';

const ProfileStatistics = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [destinations, setDestinations] = useState([]);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [isDestinationsLoading, setIsDestinationsLoading] = useState(false);
    const [isLikesLoading, setIsLikesLoading] = useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = useState(false);

    useEffect(() => {
        setIsDestinationsLoading(true);
        setIsLikesLoading(true);
        setIsCommentsLoading(true);

        destinationService.getMyDestinations(user._id)
            .then(destinationResult => {
                setDestinations(destinationResult);
                setIsDestinationsLoading(false);
            });

        likeService.getLikesByUseId(user._id)
            .then(likeResult => {
                setLikes(likeResult);
                setIsLikesLoading(false);
            });

        commentService.getCommentsByUseId(user._id)
            .then(commentResult => {
                setComments(commentResult);
                setIsCommentsLoading(false);
            });
    }, []);

    const destinationClickHandler = (e) => {
        e.preventDefault();
        const destinationId = e.currentTarget.id

        navigate(`/details/${destinationId}`);
    };

    const userDestinations = (
        <>
            <h5>
                Your have created {destinations.length} destination
                {
                    destinations.length == 1
                        ? ' :'
                        : 's :'
                }
            </h5>
            <ol>
                {destinations?.map(x =>
                    <li key={x._id}
                        id={x._id}
                        className='destination-item'
                        onClick={destinationClickHandler}
                    >
                        Title: {x.title} - Category:
                        {x.category?.includes('-')
                            ? ' ' + x.category.replaceAll("-", " ")
                            : ' ' + x.category
                        }
                    </li>
                )}
            </ol>
        </>
    );

    const noDestinations = (
        <>
            <h5>You don't have any destinations!</h5>
            <p>Create your first destination form <Link className='create-link' to="/create">Here</Link>.</p>
        </>
    )

    const profilePage = (
        <div className='profile-card' >
            <fieldset>
                <legend>User profile statistics for {user.email}</legend>
                <div className="profile-card-field">
                    <span className="profile-content">
                        <div className='profile-content-text'>
                            {
                                destinations?.length > 0
                                    ? userDestinations
                                    : noDestinations
                            }
                        </div>
                        <div className='likes-comments-info'>
                            {
                                likes > 0
                                    ? <p>You liked {likes} destination
                                        {
                                            likes == 1
                                                ? '.'
                                                : 's.'
                                        }
                                    </p>
                                    : <p>You haven't liked any destination.</p>
                            }
                            {
                                comments > 0
                                    ? <p>You created {comments} comment
                                        {
                                            comments == 1
                                                ? '.'
                                                : 's.'
                                        }
                                    </p>
                                    : <p>You haven't created any comment.</p>
                            }
                        </div>
                    </span>
                </div>

            </fieldset>
        </div>
    );

    const isLoading = isDestinationsLoading || isLikesLoading || isCommentsLoading;

    return (
        <>
            {isLoading ? <LoadingSpinner /> : profilePage}
        </>
    )
}

export default ProfileStatistics;