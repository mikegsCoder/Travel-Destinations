import * as constants from '../constants/constants';
import * as request from './requester';

export const login = (email, password) => 
    request.post(`${constants.baseUrl.auth}/users/login`, { email, password });

export const register = (email, password) =>
    request.post(`${constants.baseUrl.auth}/users/register`, {email, password});

export const logout = (token) => {
    return request.post(`${constants.baseUrl.auth}/users/logout`, {
        headers: {
            'X-Authorization': token,
        }
    });
};

export const getUser = () => {
    let username = localStorage.getItem('username');

    return username;
};

export const isAuthenticated = () => {
    return Boolean(getUser());
};