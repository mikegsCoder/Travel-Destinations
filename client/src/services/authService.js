import * as constants from '../constants/constants';
import * as request from './requester';

export const login = async (email, password) => {
    let res = await fetch(`${constants.baseUrl.auth}/users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    };
};

export const register = async (email, password) => {
    let res = await fetch(`${constants.baseUrl.auth}/users/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    let jsonResult = await res.json();

    if (res.ok) {
        return jsonResult;
    } else {
        throw jsonResult.message;
    };
};

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