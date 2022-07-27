import { useState, useEffect, useMemo } from 'react';

import * as destinationService from '../services/destinationService';

const useCommentsState = (destinationId) => {
    // console.log(destinationId);

    const [comments, setComments] = useState({});

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect(() => {
        destinationService.getDestinationComments(destinationId, controller.signal)
            .then(commentsResult => {
                setComments(commentsResult);
            })

        return () => {
            controller.abort();
        }
    }, [destinationId, controller]);

    return [
        comments,
        setComments
    ]
};

export default useCommentsState;