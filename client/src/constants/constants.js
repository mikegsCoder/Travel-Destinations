const baseUrl = {
    auth: 'https://travel-destinations-server.herokuapp.com',
    data: 'https://travel-destinations-server.herokuapp.com/data'
}

const pageSize = 3;

const destinationConstants = {
    titleMinLength: 3,
    titleMaxLength: 30,
    descriptionMinLength: 5,
    descriptionMaxLength: 400,
    imageMinLength: 15,
    latMinValue: -90,
    latMaxValue: 90,
    lngMinValue: -180,
    lngMaxValue: 180
};

const userConstants = {
    emailRegexp: /^[A-Za-z0-9_.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/,
    passwordMinLength: 6,
    passwordMaxLength: 20
};

const commentConstants = {
    commentMinLength: 5,
    commentMaxLength: 300
};

const appNotificationMessages = {
    // account messages:
    loginSuccess: 'You logged in successfully.',
    registerSuccess: 'Your registration was successful.',
    logoutSuccess: 'You are loged out.',
    // destination messages:
    destinationCreateSuccess: 'Destination successfully created.',
    destinationEditSuccess: 'Destination successfully edited.',
    destinationLikeSuccess: 'Successfuly liked ',
    destinationDeleteSuccess: 'Destination successfully deleted.',
    // comment messages:
    commentCreateSuccess: 'Successfully commented destination.',
    commentEditSuccess: 'Successfully edited comment.',
    commentDeleteSuccess: 'Successfully deleted comment.'
}

const categories = [
    { value: 'Mountains', text: 'Mountains' },
    { value: 'Sea-and-ocean', text: 'Sea and ocean' },
    { value: 'Caves', text: 'Caves' },
    { value: 'Lakes-and-rivers', text: 'Lakes and rivers' },
    { value: 'Historical-places', text: 'Historical places' },
    { value: 'Other', text: 'Other' }
];

export {
    baseUrl,
    pageSize,
    destinationConstants,
    userConstants,
    commentConstants,
    appNotificationMessages,
    categories
};