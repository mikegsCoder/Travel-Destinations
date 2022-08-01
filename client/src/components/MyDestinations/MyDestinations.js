import './MyDestinations.css';

import React from 'react';
import { useState, useEffect } from 'react';

import * as destinationService from '../../services/destinationService';
import { useAuthContext } from '../../contexts/AuthContext';
import DestinationCarousel from '../Common/DestinationCarousel';
import LoadingSpinner from '../Common/Spinner';
import { useNotificationContext, types } from '../../contexts/NotificationContext';

const MyDestinations = () => {
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
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
        <div className="my-destinatins-carousel" >
            <h4>My Destinations: {destinations.length}</h4>
            <DestinationCarousel destinations={destinations} />
        </div>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : myDestinations}
        </>
    );
}

export default MyDestinations;