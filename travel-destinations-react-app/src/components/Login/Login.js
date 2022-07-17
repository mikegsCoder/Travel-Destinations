import './Login.css';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

import * as authService from '../../services/authService';

const Login = () => {
    const { login } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const navigate = useNavigate();

    const onLoginHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        authService.login(email, password)
            .then((authData) => {
                login(authData);
                addNotification('You logged in successfully', types.success);
                navigate('/home-page');
            })
            .catch(err => {
                // TODO: show notification
                console.log(err);
            });
    }

    return (
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
                            <input type="text" className="form-control-1" name="email" placeholder="Enter email" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text-1"><FontAwesomeIcon icon={faLock} className="font-awesome-icon" /></span>
                            </div>
                            <input type="text" className="form-control-1" name="password" placeholder="Enter password" />
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
}

export default Login;