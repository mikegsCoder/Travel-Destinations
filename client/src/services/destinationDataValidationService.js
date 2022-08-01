import * as constants from '../constants/constants';

export const titleValidation = (currentTitle) => {
    if (currentTitle.length < constants.destinationConstants.titleMinLength) {
        return `Destination title should be at least ${constants.destinationConstants.titleMinLength} characters long!`;
    } else if (currentTitle.length > constants.destinationConstants.titleMaxLength) {
        return `Destination title should be at most ${constants.destinationConstants.titleMaxLength} characters long!`;
    } else {
        return '';
    };
};

export const descriptionValidation = (currentDescription) => {
    if (currentDescription.length < constants.destinationConstants.descriptionMinLength) {
        return `Destination description should be at least ${constants.destinationConstants.descriptionMinLength} characters long!`;
    } else if (currentDescription.length > constants.destinationConstants.descriptionMaxLength) {
        return `Destination description should be at most ${constants.destinationConstants.descriptionMaxLength} characters long!`;
    } else {
        return '';
    };
};

export const imgUrlValidation = (currentImgUrl) => {
    if (currentImgUrl.length < constants.destinationConstants.imageMinLength) {
        return `Image URL should be at least ${constants.destinationConstants.imageMinLength} characters long!`;
    } else {
        return '';
    };
};

export const latitudeValidation = (currentLatitude) => {
    if (currentLatitude < constants.destinationConstants.latMinValue
        || currentLatitude > constants.destinationConstants.latMaxValue) {
        return `Destination latitude should be between ${constants.destinationConstants.latMinValue} and +${constants.destinationConstants.latMaxValue}!`;
    } else {
        return '';
    };
};

export const longitudeValidation = (currentLongitude) => {
    if (currentLongitude < constants.destinationConstants.lngMinValue
        || currentLongitude > constants.destinationConstants.lngMaxValue) {
        return `Destination longitude should be between ${constants.destinationConstants.lngMinValue} and +${constants.destinationConstants.lngMaxValue}!`;
    } else {
        return '';
    };
};

export const destinationFormValidation = (title, description, imageUrl, latitude, longitude) => {
    let validationResult = '';
    let invalidFields = [];

    if (title.length < constants.destinationConstants.titleMinLength
        || title.length > constants.destinationConstants.titleMaxLength) {
        validationResult += 'Invalid title';
        invalidFields.push('title');
    };

    if (description.length < constants.destinationConstants.descriptionMinLength
        || description.length > constants.destinationConstants.descriptionMaxLength) {
        validationResult.length == 0
            ? validationResult = 'Invalid description!'
            : validationResult += ' and description!'
        invalidFields.push('description');
    } else {
        validationResult.length > 0
            ? validationResult += '!'
            : validationResult = '';
    };

    if (imageUrl.length < constants.destinationConstants.imageMinLength) {
        validationResult += ' Image URL is too short!';
        invalidFields.push('image');
    };

    if (latitude < constants.destinationConstants.latMinValue
        || latitude > constants.destinationConstants.latMaxValue) {
            validationResult += ' Invalid latitude';
            invalidFields.push('latitude');
    };

    if (longitude < constants.destinationConstants.lngMinValue
        || longitude > constants.destinationConstants.lngMaxValue) {
            validationResult.includes('latitude')
            ? validationResult += ' and longitude!'
            : validationResult += ' Invalid longitude!';
            invalidFields.push('longitude');
    }else{
        validationResult.length > 0 && validationResult.includes('latitude')
            ? validationResult += '!'
            : validationResult += '';
    };

    return { validationResult, invalidFields };
};