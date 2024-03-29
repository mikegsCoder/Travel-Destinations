import * as request from './requester';
import * as constants from '../constants/constants';

export const createComment = (destinationId, comment, userEmail) =>
    request.post(`${constants.baseUrl.data}/comments`, { destinationId, comment, userEmail });

export const getDestinationComments = (destinationId) => {
    let query = encodeURIComponent(`destinationId="${destinationId}"`);

    return request.get(`${constants.baseUrl.data}/comments?where=${query}`);
};

export const deleteComment = (commentId) =>
    request.del(`${constants.baseUrl.data}/comments/${commentId}`);

export const getCommentById = (commentId) =>
    request.get(`${constants.baseUrl.data}/comments/${commentId}`);

export const editComment = (commentId, commentData) =>
    request.put(`${constants.baseUrl.data}/comments/${commentId}`, commentData);

export const getCommentsByUseId = (userId) => {
    const query = encodeURIComponent(`_ownerId="${userId}"`);

    return request.get(`${constants.baseUrl.data}/comments?where=${query}&count`)
};

export const getCommentsCountBydestinationId = (destinationId) => {
    const query = encodeURIComponent(`destinationId="${destinationId}"`);

    return request.get(`${constants.baseUrl.data}/comments?where=${query}&count`);
};

export const getCommentsPaginated = (pageSize, page, destinationId) => {
    const query = encodeURIComponent(`destinationId="${destinationId}"`);
    const comments = (page) => `${constants.baseUrl.data}/comments?where=${query}&offset=${(page - 1) * pageSize}&pageSize=${pageSize}`;

    return request.get(comments(page));
};