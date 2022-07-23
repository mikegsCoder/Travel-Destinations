const baseUrl = 'http://localhost:3030/data';

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