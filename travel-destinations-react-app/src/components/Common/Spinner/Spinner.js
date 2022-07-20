import Spinner from 'react-bootstrap/Spinner';
import './Spinner.css'

function LoadingSpinner() {
    // return <Spinner animation="border" variant="light" />
    return (
        <>
            <Spinner animation="border" variant="light" />
            <span className={'spinner-text'}>Loading ...</span>
        </>
    )
}

export default LoadingSpinner;

// import { FC } from 'react';

// import styles from './LoadingSpinner.module.css';

// const LoadingSpinner = ({ className }) => {
//   return <div className={`${styles.spinner} ${className}`} >
//     <span className={styles['spinner-text']}>Loading</span>
//   </div>;
// };

// export default LoadingSpinner;