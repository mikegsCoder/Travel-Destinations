import './Login.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as authService from '../../services/authService';
import * as constants from '../../constants/constants';
import { useAuthContext } from '../../contexts/AuthContext';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import LoadingSpinner from '../Common/Spinner';

const Login = () => {
    const { login } = useAuthContext();
    const { addNotification } = useApplicationNotificationContext();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onLoginHandler = (e) => {
        e.preventDefault();
        
        let formData = new FormData(e.currentTarget);
        
        let email = formData.get('email');
        let password = formData.get('password');
        
        setIsLoading(true);

        authService.login(email, password)
            .then((authData) => {
                login(authData);
                setIsLoading(false);
                addNotification(constants.appNotificationMessages.loginSuccess, types.success);
                navigate('/home-page');
            })
            .catch(err => {
                setIsLoading(false);
                addNotification(err, types.danger);
            });
    };

    const loginPage = (
        <div className="container-login">
            <div className="form-box-login">
                <div className="header-form">
                    <h4><FontAwesomeIcon icon={faCircleUser} className="font-awesome-icon" style={{ fontSize: "5rem" }} /></h4>
                </div>
                <div className="body-form">
                    <form onSubmit={onLoginHandler} method="POST">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text-1"><FontAwesomeIcon icon={faEnvelope} className="font-awesome-icon" /></span>
                            </div>
                            <input 
                                type="email" 
                                className="form-control-login" 
                                name="email" 
                                spellCheck={false}
                                placeholder="Enter email" 
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text-2"><FontAwesomeIcon icon={faLock} className="font-awesome-icon" /></span>
                            </div>
                            <input 
                                type="password" 
                                className="form-control-login" 
                                name="password" 
                                spellCheck={false}
                                placeholder="Enter password" 
                                required
                            />
                        </div>
                        <button type="submit" className="btn-secondary btn-block" id="login-btn">Login</button>
                        <div id="login-message">
                            <div><p>Don't have an account? <Link to="/register">Sign up</Link></p></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : loginPage}
        </>
    );
};

export default Login;