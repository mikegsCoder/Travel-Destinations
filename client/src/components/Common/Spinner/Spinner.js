import './Spinner.css';

import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
    return (
        <>
            <Spinner animation="border" variant="light" />
            <span className={'spinner-text'}>Loading ...</span>
        </>
    );
};

export default LoadingSpinner;