import { useState, useEffect, useMemo } from 'react';

import * as likeService from '../services/likeService';

const useLikesState = (destinationId) => {
    // console.log(destinationId);

    const [likes, setLikes] = useState({});

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect(() => {
        likeService.getDestinationLikes(destinationId, controller.signal)
            .then(likesResult => {
                setLikes(likesResult);
            })

        return () => {
            controller.abort();
        }
    }, [destinationId, controller]);

    return [
        likes,
        setLikes
    ]
};

export default useLikesState;