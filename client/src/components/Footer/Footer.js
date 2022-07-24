import './Footer.css';

// import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <div id="site-footer" className="wrapper row5">
            <div id="copyright" className="hoc clear">
                <p className="fl_left">Copyright &copy; 2022 - <a href="https://mikegscoder.github.io/">mikegsCoder</a></p>
                <p className="fl_right">React Course Project @  <a href="https://softuni.bg/">SoftUni</a></p>
            </div>
        </div>
    );
}

export default Footer;