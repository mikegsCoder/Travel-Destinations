import './Header.css';

import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
// import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
// import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'


const Header = () => {
    const navigate = useNavigate();

    const { user } = useAuthContext();

    const guestNavigation = (
        <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
        </>
    );

    const userRightNavigation = (
        <>
            <li><p id="user-email">Welcome: {user.email}</p></li>
            <li><Link to="/logout">Logout</Link></li>
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

        // console.log("in select Handler");
        // console.log(e.currentTarget.value);
        let category = e.currentTarget.value;

        e.currentTarget.value = "Select";

        if (category == 'Select Category :') {
            return;
        }

        // console.log(category);

        navigate(`/by-category/${category}`);
    }

    return (
        <div className="wrapper row0">
            <div id="topbar" className="hoc clear">
                <div className="fl_left">
                    <ul className="nospace">
                        <li><Link to="/home-page"><FontAwesomeIcon icon={faHouseChimney} className="font-awesome-icon" /></Link></li>
                        {/* <li><a href="#">About</a></li> */}
                        <li><Link to="/all-destinations">All Destinations</Link></li>
                        <li><Link to="/recent">Recent Destinations</Link></li>
                        <li>
                            <p className="field" id="search-by-category">
                                {/* <label htmlFor="category">Category</label> */}
                                <span className="input">
                                    <select id="search-category" name="category" defaultValue={"Select"} onChange={onCategorySelect}>
                                        <option value="Select">Select Category :</option>
                                        <option value="Mountains">Mountains</option>
                                        <option value="Sea-and-ocean">Sea and ocean</option>
                                        <option value="Lakes-and-rivers">Lakes and rivers</option>
                                        <option value="Caves">Caves</option>
                                        <option value="Historical-places">Historicl places</option>
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
                </div>
                <div className="fl_right">
                    <ul className="nospace">
                        {user.email
                            ? userRightNavigation
                            : guestNavigation
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;