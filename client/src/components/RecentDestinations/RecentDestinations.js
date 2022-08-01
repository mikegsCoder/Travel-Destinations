import './RecentDestinations.css';

import { useState, useEffect } from 'react';

import * as destinationService from '../../services/destinationService';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import DestinationCarousel from '../Common/DestinationCarousel';
import LoadingSpinner from '../Common/Spinner';
import NoDestinations from '../Common/NoDestinations';

const RecentDestinations = () => {
    const { addNotification } = useApplicationNotificationContext();
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        destinationService.getRecentDestinations()
            .then(result => {
                setDestinations(result);
                setIsLoading(false);
            })
            .catch(err => {
                addNotification(err, types.danger);
                setIsLoading(false);
            });
    }, []);

    const recentDestinations = (
        destinations.length > 0
        ? <div className="recent-carousel" >
            <h4>Recent Destinations</h4>
            <DestinationCarousel destinations={destinations} />
        </div>
        : <NoDestinations/>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : recentDestinations}
        </>
    );
}

export default RecentDestinations;