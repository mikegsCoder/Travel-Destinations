import './MyDestinations.css';

import { useState, useEffect } from 'react';

import * as destinationService from '../../services/destinationService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import DestinationCarousel from '../Common/DestinationCarousel';
import LoadingSpinner from '../Common/Spinner';
import NoDestinations from '../Common/NoDestinations';

const MyDestinations = () => {
    const { user } = useAuthContext();
    const { addNotification } = useApplicationNotificationContext();
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        destinationService.getMyDestinations(user._id)
            .then(destinationResult => {
                setDestinations(destinationResult);
                setIsLoading(false);
            })
            .catch(err => {
                addNotification(err, types.danger);
                setIsLoading(false);
            });
    }, []);

    const myDestinations = (
        destinations.length > 0
        ? <div className="my-destinatins-carousel" >
            <h4>My Destinations: {destinations.length}</h4>
            <DestinationCarousel destinations={destinations} />
        </div>
        : <NoDestinations/>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : myDestinations}
        </>
    );
}

export default MyDestinations;