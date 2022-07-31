import './CommentList.css';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as commentService from '../../services/commentService';
import * as constants from '../../constants/constants';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import useDestinationState from '../../hooks/useDestinationState';
import LoadingSpinner from '../Common/Spinner';
import CommentCard from './CommentCard';

const CommentList = () => {
    const navigate = useNavigate();
    const [allComments, setAllComments] = useState([]);
    const [comments, setComments] = useState([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const { destinationId } = useParams();
    const [destination, setDestination] = useDestinationState(destinationId);
    const [isLoading, setIsLoading] = useState(false);
    const { addNotification } = useApplicationNotificationContext();

    useEffect(() => {
        setIsLoading(true);

        commentService.getDestinationComments(destinationId)
            .then(result => {
                setAllComments(result);
                setPages(Math.ceil(result.length / constants.pageSize));
                setComments(result.slice((page - 1) * constants.pageSize, page * constants.pageSize));
                setIsLoading(false);
            })
            .catch(err => {
                addNotification(err, types.danger);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setComments(allComments.slice((page - 1) * constants.pageSize, page * constants.pageSize));
    }, [page]);

    const onPrevBtnClick = (e) => {
        e.preventDefault();
        setPage(page - 1);
    };

    const onNextBtnClick = (e) => {
        e.preventDefault();
        setPage(page + 1);
    };

    const onImageClick = (e) => {
        e.preventDefault();
        navigate(`/details/${destinationId}`);
    };

    const commentList = (
        <>
            <h4 className='all-comments-title'>All Comments: {destination.title}</h4>

            <span className='comment-image-wrapper' >
                <img src={destination.imageUrl} alt={destination.title} onClick={onImageClick} />
            </span>

            <ul className="comments-list">
                {comments.map(x => <CommentCard key={x._id} comment={x} />)}
            </ul>

            <div className="pagination">
                <h3 className='btn-left'>
                    {page > 1
                        ? <button
                            id="prev-btn"
                            onClick={onPrevBtnClick}>
                            Prev
                        </button>
                        : null
                    }
                </h3>
                <h3 className='page-text'>
                    Page {page} of {pages}
                </h3>
                <h3 className='btn-right'>
                    {page < pages
                        ? <button
                            id="next-btn"
                            onClick={onNextBtnClick}>
                            Next
                        </button>
                        : null
                    }
                </h3>
            </div>
        </>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : commentList}
        </>
    );
}

export default CommentList;