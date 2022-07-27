import { useState, useEffect, useMemo } from 'react';

import * as destinationService from '../services/destinationService';

const useCommentState = (commentId) => {
    // console.log(destinationId);

    const [comment, setComment] = useState({});

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect(() => {
        destinationService.getCommentById(commentId, controller.signal)
            .then(commentResult => {
                setComment(commentResult);
            })

        return () => {
            controller.abort();
        }
    }, [commentId, controller]);

    return [
        comment,
        setComment
    ]
};

export default useCommentState;