import { useState, useEffect } from 'react';

import * as likeService from '../services/likeService';

const useLikesState = (destinationId) => {
    const [likes, setLikes] = useState({});

    useEffect(() => {
        likeService.getDestinationLikes(destinationId)
            .then(likesResult => {
                setLikes(likesResult);
            });
    }, [destinationId]);

    return [
        likes,
        setLikes
    ];
};

export default useLikesState;