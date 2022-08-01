import * as request from './requester';
import * as constants from '../constants/constants';

export const like = (userId, destinationId) => request.post(`${constants.baseUrl.data}/likes`, {userId, destinationId});

export const getDestinationLikes = (destinationId) => {
    const query = encodeURIComponent(`destinationId="${destinationId}"`);

    return request.get(`${constants.baseUrl.data}/likes?select=userId&where=${query}`)
        .then(res => res.map(x => x.userId));
};

export const getLikesByUseId = (userId) => {
    const query = encodeURIComponent(`_ownerId="${userId}"`);

    return request.get(`${constants.baseUrl.data}/likes?where=${query}&count`)
};