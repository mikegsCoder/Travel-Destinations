import './Footer.css';

const Footer = () => {

    return (
        <div className="site-footer">
            <p className="footer-left">
                Travel Destinations v_1.6 &copy; 2022 - {' '}
                <a href="https://github.com/mikegsCoder/Travel-Destinations" target="_blank" rel="noreferrer">
                    mikegsCoder
                </a>
            </p>
            <p className="footer-right">
                ReactJS Course Project @ {' '}
                <a href="https://softuni.bg/" target="_blank" rel="noreferrer">
                    SoftUni
                </a>
            </p>
        </div>
    );
}

export default Footer;