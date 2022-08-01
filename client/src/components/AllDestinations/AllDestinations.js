import './AllDestinations.css';

import { useState, useEffect } from 'react';

import * as destinationService from '../../services/destinationService';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import DestinationCarousel from '../Common/DestinationCarousel';
import LoadingSpinner from '../Common/Spinner';
import NoDestinations from '../Common/NoDestinations';

const AllDestinations = () => {
    const { addNotification } = useApplicationNotificationContext();
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        destinationService.getAllDestinations()
            .then(result => {
                setDestinations(result);
                setIsLoading(false);
            })
            .catch(err => {
                addNotification(err, types.danger);
                setIsLoading(false);
            });
    }, []);

    const allDestinations = (
        destinations.length > 0
        ?<div className="home-carousel" >
            <h4>All Destinations: {destinations.length}</h4>
            <DestinationCarousel destinations={destinations} />
        </div>
        : <NoDestinations/>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : allDestinations}
        </>
    );
}

export default AllDestinations;