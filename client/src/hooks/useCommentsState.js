import { useState, useEffect } from 'react';
import * as commentService from '../services/commentService';

const useCommentsState = (destinationId) => {
    const [comments, setComments] = useState({});

    useEffect(() => {
        commentService.getDestinationComments(destinationId)
            .then(commentsResult => {
                setComments(commentsResult);
            });
    }, [destinationId]);

    return [
        comments,
        setComments
    ];
};

export default useCommentsState;