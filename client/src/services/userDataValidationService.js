import * as constants from '../constants/constants';

export const emailValidation = (currentEmail) => {
    if (!currentEmail.match(constants.userConstants.emailRegexp)) {
        return 'Invalid email';
    } else {
        return '';
    };
};

export const passwordValidation = (currentPassword) => {
    if (currentPassword.length < constants.userConstants.passwordMinLength) {
        return `Password should be at least ${constants.userConstants.passwordMinLength} characters long!`;
    } else if (currentPassword.length > constants.userConstants.passwordMaxLength) {
        return `Password should be at most ${constants.userConstants.passwordMaxLength} characters long!`;
    } else {
        return '';
    };
};

export const repassValidation = ({currentPassword, currentRepass}) => {
    if (currentRepass != currentPassword) {
        return 'Passwords don\'t match!';
    } else {
        return '';
    };
};

export const userDataValidation = (email, password, repass) => {
    let validationResult = '';
    let invalidFields = [];

    if (!email.match(constants.userConstants.emailRegexp)) {
        validationResult += 'Invalid email';
        invalidFields.push('email');
    };
    
    if (password.length < constants.userConstants.passwordMinLength 
        || password.length > constants.userConstants.passwordMaxLength) {
        validationResult.length == 0
            ? validationResult = 'Invalid password!'
            : validationResult += ' and password!';
            invalidFields.push('password');
    } else {
        validationResult.length > 0
            ? validationResult += '!'
            : validationResult = '';
    };

    if (password != repass) {
        validationResult += ' Passwords don\'t match!';
            invalidFields.push('repass');
    };

    return { validationResult, invalidFields };
};