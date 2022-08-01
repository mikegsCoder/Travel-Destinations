import * as constants from '../constants/constants';

export const commentValidation = (currentComment) => {
    if (currentComment.length < constants.commentConstants.commentMinLength) {
        return `Comment should be at least ${constants.commentConstants.commentMinLength} characters long!`;
    } else if (currentComment.length > constants.commentConstants.commentMaxLength) {
        return `Comment should be at most ${constants.commentConstants.commentMaxLength} characters long!`;
    } else {
        return '';
    };
};