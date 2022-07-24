import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import { faPhoneFlip } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {

    return (
        <div className="wrapper bgded overlay" id="dashboard-background">
            <div id="pageintro" className="hoc clear">
                <article>
                    <p>Travel the world</p>
                    <h3 className="heading">Share yours best travel destinations</h3>
                    <p>An amazing collection of travel destinations created by our users</p>
                    {/* <footer><a className="btn" href="#">Fringilla est pharetra</a></footer> */}
                </article>
            </div>
        </div>
    );
}

export default HomePage;