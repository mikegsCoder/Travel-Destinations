import * as request from './requester';
import * as constants from '../constants/constants';

export const getAllDestinations = () => 
    request.get(`${constants.baseUrl.data}/destinations`);

export const getRecentDestinations = () => 
    request.get(`${constants.baseUrl.data}/destinations?sortBy=_createdOn%20desc&distinct=category`);

export const getMyDestinations = (ownerId) => {
    let query = encodeURIComponent(`_ownerId="${ownerId}"`);

    return request.get(`${constants.baseUrl.data}/destinations?where=${query}`);
};

export const getByCategory = (category) => {
    let query = encodeURIComponent(`category="${category}"`);

    return request.get(`${constants.baseUrl.data}/destinations?where=${query}`);
};

export const createDestination = (destinationData) => 
    request.post(`${constants.baseUrl.data}/destinations`, destinationData);

export const updateDestination = (destinationId, destinationData) => 
    request.put(`${constants.baseUrl.data}/destinations/${destinationId}`, destinationData);

export const getDestinationById = (destinationId) => 
    request.get(`${constants.baseUrl.data}/destinations/${destinationId}`);

export const deleteDestination = (destinationId) =>  
    request.del(`${constants.baseUrl.data}/destinations/${destinationId}`);