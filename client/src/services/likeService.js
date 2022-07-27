import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';

export const like = (userId, destinationId) => request.post(`${baseUrl}/likes`, {userId, destinationId});

export const getDestinationLikes = (destinationId) => {
    const query = encodeURIComponent(`destinationId="${destinationId}"`);

    return request.get(`${baseUrl}/likes?select=userId&where=${query}`)
        .then(res => res.map(x => x.userId));
};