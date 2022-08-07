import './Register.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as authService from '../../services/authService';
import * as dataValidation from '../../services/userDataValidationService';
import * as constants from '../../constants/constants';
import { useAuthContext } from '../../contexts/AuthContext';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import { useInvalidDataNotificationContext, debounce } from '../../contexts/InvalidDataNotificationContext';
import LoadingSpinner from '../Common/Spinner';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const { addNotification } = useApplicationNotificationContext();
    const { addInvalidDataNotification } = useInvalidDataNotificationContext();
    const [errors, setErrors] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');

    const registerSubmitHandler = (e) => {
        e.preventDefault();

        let { email, password, repass } = Object.fromEntries(new FormData(e.currentTarget));

        const { validationResult, invalidFields } = dataValidation.userDataValidation(email, password, repass);
        setErrors(invalidFields);

        if (validationResult.length != 0) {
            addInvalidDataNotification(validationResult);
            return;
        };

        setIsLoading(true);

        authService.register(email, password)
            .then(authData => {
                login(authData);
                setIsLoading(false);
                addNotification(constants.appNotificationMessages.registerSuccess, types.success);
                navigate('/home-page');
            })
            .catch(err => {
                setIsLoading(false);
                addNotification(err, types.danger);
            });
    };

    const verifyChangeHandlerData = (name, value) => {
        let validationResult = false;

        switch (name) {
            case 'email':
                validationResult = dataValidation.emailValidation(value);
                break;
            case 'password':
                validationResult = dataValidation.passwordValidation(value);
                break;
            case 'repass':
                validationResult = dataValidation.repassValidation(value);
                break;
        };

        if (validationResult) {
            addInvalidDataNotification(validationResult);
            setErrors(state => [...state, name]);
        } else if (errors.includes(name)) {
            setErrors(state => state.filter(x => x != name));
        };
    };

    const emailChangeHandler = debounce((e) =>
        verifyChangeHandlerData('email', e.target.value)
    );

    const passwordChangeHandler = debounce((e) => {
        const currentPassword = e.target.value;
        setCurrentPassword(currentPassword);
        verifyChangeHandlerData('password', currentPassword);
    });

    const repassChangeHandler = debounce((e) => {
        const currentRepass = e.target.value
        verifyChangeHandlerData('repass', { currentPassword, currentRepass });
    });

    const registerPage = (
        <>
            <div className="container-register">
                <div className="form-box-register">
                    <div className="header-form">
                        <h4 className="text-primary text-center">
                            <FontAwesomeIcon
                                icon={faCircleUser}
                                className="font-awesome-icon"
                                style={{ fontSize: "5rem" }}
                            />
                        </h4>
                    </div>
                    <div className="body-form">
                        <form onSubmit={registerSubmitHandler}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text-2">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="font-awesome-icon"
                                            id='register-email'
                                        />
                                    </span>
                                </div>
                                <input
                                    type="email"
                                    className="form-control-register"
                                    name="email"
                                    placeholder="Enter email"
                                    spellCheck='false'
                                    style={{
                                        borderColor: errors.includes('email')
                                            ? 'red'
                                            : '#666'
                                    }}
                                    required
                                    onChange={emailChangeHandler}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text-3">
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            className="font-awesome-icon"
                                            id='register-password'
                                        />
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control-register"
                                    name="password"
                                    spellCheck='false'
                                    placeholder="Enter password"
                                    style={{
                                        borderColor: errors.includes('password')
                                            ? 'red'
                                            : '#666'
                                    }}
                                    required
                                    onChange={passwordChangeHandler}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text-3">
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            className="font-awesome-icon"
                                            id='register-repass'
                                        />
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control-register"
                                    name="repass"
                                    spellCheck='false'
                                    placeholder="Repeat password"
                                    style={{
                                        borderColor: errors.includes('repass')
                                            ? 'red'
                                            : '#666'
                                    }}
                                    required
                                    onChange={repassChangeHandler}
                                />
                            </div>
                            <button type="submit" className="btn-secondary btn-block" id="register-btn">Register</button>
                            <div id="register-message">
                                <div>
                                    <p>
                                        Allready have an account? <Link to="/login">Sign in</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : registerPage}
        </>
    );
};

export default Register;