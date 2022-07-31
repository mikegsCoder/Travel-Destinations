import { useState, useEffect } from 'react';
import * as commentService from '../services/commentService';

const useCommentState = (commentId) => {
    const [comment, setComment] = useState({});

    useEffect(() => {
        commentService.getCommentById(commentId)
            .then(commentResult => {
                setComment(commentResult);
            });
    }, [commentId]);

    return [
        comment,
        setComment
    ];
};

export default useCommentState;