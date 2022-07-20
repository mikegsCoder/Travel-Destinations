import './Register.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import LoadingSpinner from '../Common/Spinner';
import * as authService from '../../services/authService';
import { Alert } from 'react-bootstrap';

const Register = () => {
    const navigate = useNavigate();
    const { addNotification } = useNotificationContext();
    const { login } = useAuthContext();
    const [errors, setErrors] = useState({ name: false })
    const [isLoading, setIsLoading] = useState(false);
    const emailRegexp = /^[A-Za-z0-9_.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;

    const registerSubmitHandler = (e) => {
        e.preventDefault();

        let { email, password, repass } = Object.fromEntries(new FormData(e.currentTarget));

        let validationResult = '';

        if (!email.match(emailRegexp)) {
            validationResult += 'Invalid email';
            document.getElementById('register-email').style.color = 'red';
        }
        else {
            document.getElementById('register-email').style.color = 'skyblue';
        }

        if (password.length < 6 || password.length > 20) {
            validationResult.length == 0
                ? validationResult = 'Invalid password!'
                : validationResult += ' and password!'
            document.getElementById('register-password').style.color = 'red';
        } else {
            validationResult.length > 0
                ? validationResult += '!'
                : validationResult = '';
            document.getElementById('register-password').style.color = 'skyblue';
        }

        if (password != repass) {
            validationResult += ' Passwords don\'t match!';
            document.getElementById('register-repass').style.color = 'red';
        } else {
            document.getElementById('register-repass').style.color = 'skyblue';
        }

        if (validationResult.length != 0) {

            // async function invalidRegisterData () {
            //     setErrors(state => ({ ...state, name: validationResult }));
            //     await new Promise(resolve => setTimeout(resolve, 3000));
            //     setErrors(state => ({ ...state, name: false }));
            //   }

            // invalidRegisterData();

            (async () => {
                setErrors(state => ({ ...state, name: validationResult }));
                await new Promise(resolve => setTimeout(resolve, 3000));
                setErrors(state => ({ ...state, name: false }));
            })();

            return;
        };

        setIsLoading(true);

        authService.register(email, password)
            .then(authData => {
                login(authData);
                setIsLoading(false);
                addNotification('Your registration was successful', types.success);
                navigate('/home-page');
            })
            .catch(err => {
                setIsLoading(false);
                addNotification(err, types.danger);
            });
    };

    //-----------debounce-------------
    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    };

    const emailChangeHandler = debounce((e) => emailValidation(e));

    // const emailChangeHandler = (e) => {
    const emailValidation = (e) => {
        let currentEmail = e.target.value;

        if (currentEmail.length < 9) {
            setErrors(state => ({ ...state, name: 'Email should be at least 9 characters!' }));
        } else if (currentEmail.length > 30) {
            setErrors(state => ({ ...state, name: 'Email should be max 30 characters!' }));
        } else {
            setErrors(state => ({ ...state, name: false }));
        };
    };

    const passwordChangeHandler = debounce((e) => passwordValidation(e));

    // const passwordChangeHandler = (e) => {
    const passwordValidation = (e) => {
        let currentPassword = e.target.value;

        if (currentPassword.length < 6) {
            setErrors(state => ({ ...state, name: 'Password should be at least 6 characters!' }));
        } else if (currentPassword.length > 20) {
            setErrors(state => ({ ...state, name: 'Password should be max 20 characters!' }));
        } else {
            setErrors(state => ({ ...state, name: false }));
        };
    };

    const repassChangeHandler = debounce((e) => repassValidation(e));

    const repassValidation = (e) => {
        const currentPassword = document.getElementById("password").value;
        let currentRepass = e.target.value;

        if (currentRepass != currentPassword) {
            setErrors(state => ({ ...state, name: 'Passwords don\'t match!' }));
        } else {
            setErrors(state => ({ ...state, name: false }));
        };
    };

    const registerPage = (
        <>
            <Alert variant="danger" show={errors.name}>{errors.name}</Alert>
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
                                    className="form-control-2"
                                    name="email"
                                    placeholder="Enter email"
                                    spellCheck='false'
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
                                    className="form-control-2"
                                    name="password"
                                    id="password"
                                    spellCheck='false'
                                    placeholder="Enter password"
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
                                    className="form-control-2"
                                    name="repass"
                                    spellCheck='false'
                                    placeholder="Repeat password"
                                    onChange={repassChangeHandler}
                                />
                            </div>
                            <button type="submit" className="btn-secondary btn-block" id="register-btn">Register</button>
                            <div id="register-message">
                                <div>
                                    <p>
                                        Allready have an account?
                                        <Link to="/login">Sign in</Link>
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
}

export default Register;