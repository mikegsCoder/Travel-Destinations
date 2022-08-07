import { useState, useEffect } from 'react';

import * as commentService from '../services/commentService';

const useCommentState = (destinationId) => {
    const [commentsCount, setCommentsCount] = useState(0);

    useEffect(() => {
        commentService.getCommentsCountBydestinationId(destinationId)
        .then(result => {
            setCommentsCount(result);
        });
    }, [destinationId]);

    return [
        commentsCount,
        setCommentsCount
    ];
};

export default useCommentState;