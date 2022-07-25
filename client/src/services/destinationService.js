const baseUrl = 'http://localhost:3030/data';

import * as request from './requester';

export const getAllDestinations = () => request.get(`${baseUrl}/destinations`);

export const getRecentDestinations = () => request.get(`${baseUrl}/destinations?sortBy=_createdOn%20desc&distinct=category`);

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