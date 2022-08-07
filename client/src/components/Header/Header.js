import './Header.css';

import { useNavigate, Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const navigate = useNavigate();

    const { user } = useAuthContext();

    const emailClickHandler = (e) => {
        e.preventDefault();
        navigate('/profile');
    };

    const guestNavigation = (
        <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </>
    );

    const userRightNavigation = (
        <>
            <li>
                <p className="user-email">
                    Welcome: 
                    <span
                        className="header-user-email"
                        onClick={emailClickHandler}
                    >
                        {' ' + user.email}
                    </span>
                </p>
            </li>
            <li>
                <Link to="/logout" className='logout-btn'>
                    <img src="/images/common/logout.jpg" alt="logout" />
                </Link>
            </li>
        </>
    );

    const userLeftNavigation = (
        <>
            <li><Link to="/my-destinations">My Destinations</Link></li>
            <li><Link to="/create">Create</Link></li>
        </>
    );

    const onCategorySelect = (e) => {
        e.preventDefault();

        let category = e.currentTarget.value;

        e.currentTarget.value = "Select";

        if (category == 'Select Category :') {
            return;
        };

        navigate(`/by-category/${category}`);
    };

    return (
        <div className='navbar'>
            <ul className='navbar-left' id='left-nav'>
                <li>
                    <Link to="/home-page" className='globe-rotating'>
                        <img src="/images/common/globe.gif" alt="globe" />
                    </Link>
                </li>
                <li><Link to="/all-destinations">All Destinations</Link></li>
                <li><Link to="/recent">Recent Destinations</Link></li>
                <li>
                    <p className="field" id="search-by-category">
                        <span className="input">
                            <select id="search-category" name="category" defaultValue={"Select"} onChange={onCategorySelect}>
                                <option value="Select">SELECT CATEGORY</option>
                                <option value="Mountains">Mountains</option>
                                <option value="Sea-and-ocean">Sea and ocean</option>
                                <option value="Lakes-and-rivers">Lakes and rivers</option>
                                <option value="Caves">Caves</option>
                                <option value="Historical-places">Historical places</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                </li>
                {user.email
                    ? userLeftNavigation
                    : null
                }
            </ul>
            <ul className='navbar-right' id='right-nav'>
                {user.email
                    ? userRightNavigation
                    : guestNavigation
                }
            </ul>
        </div>
    );
};

export default Header;