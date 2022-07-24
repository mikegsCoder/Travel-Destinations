import './AllDestinations.css';

import React from 'react';
import { useState, useEffect } from 'react';

import * as destinationService from '../../services/destinationService';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import DestinationCarousel from '../DestinationCarousel';
import LoadingSpinner from '../Common/Spinner';

const AllDestinations = () => {
    const { addNotification } = useNotificationContext();
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
        <div className="home-carousel" >
            <h4>All Destinations: {destinations.length}</h4>
            <DestinationCarousel destinations={destinations} />
        </div>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : allDestinations}
        </>
    );
}

export default AllDestinations;