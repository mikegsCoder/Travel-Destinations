import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';

export const getAllDestinations = () => request.get(`${baseUrl}/destinations`);

export const getRecentDestinations = () => request.get(`${baseUrl}/destinations?sortBy=_createdOn%20desc&distinct=category`);

export const getByCategory = (category) => {
    let query = encodeURIComponent(`category="${category}"`);

    return request.get(`${baseUrl}/destinations?where=${query}`);
};

export const getMyDestinations = (ownerId) => {
    let query = encodeURIComponent(`_ownerId="${ownerId}"`);

    return request.get(`${baseUrl}/destinations?where=${query}`);
};

export const createDestination = async (destinationData, token) => {
    let response = await fetch(`${baseUrl}/destinations`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({...destinationData, likes: []})
    });

    let result = await response.json();

    return result;
};

export const updateDestination = (destinationId, destinationData) => request.put(`${baseUrl}/destinations/${destinationId}`, destinationData);

export const getDestinationById = (destinationId, signal) => {
    return fetch(`${baseUrl}/destinations/${destinationId}`)
        .then(res => res.json())
};

export const deleteDestination = (destinationId, token) => {
    return fetch(`${baseUrl}/destinations/${destinationId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());
};

export const like = (destinationId, destination, token) => {
    return fetch(`${baseUrl}/likes/${destinationId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(destination)
    }).then(res => res.json());
};

export const createComment = async (destinationId, comment, userEmail, token) => {
    let response = await fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({destinationId, comment, userEmail})
    });

    let result = await response.json();

    return result;
};

export const getDestinationComments = (destinationId) => {
    let query = encodeURIComponent(`destinationId="${destinationId}"`);

    return request.get(`${baseUrl}/comments?where=${query}`);
};

export async function getCommentsPaginated(pageSize, page, destinationId) {
    let query = encodeURIComponent(`destinationId="${destinationId}"`);
    let comments = (page) => `${baseUrl}/comments?where=${query}&offset=${(page - 1) * pageSize}&pageSize=${pageSize}`

    return request.get(comments(page));
}

export const deleteComment = (commentId, token) => {
    return fetch(`${baseUrl}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    }).then(res => res.json());
};

export const getCommentById = (commentId, signal) => {
    return fetch(`${baseUrl}/comments/${commentId}`)
        .then(res => res.json())
};

export const editComment = (commentId, commentData) => request.put(`${baseUrl}/comments/${commentId}`, commentData);
