import './RecentDestinations.css';

import { useState, useEffect } from 'react';

import * as destinationService from '../../services/destinationService';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import DestinationCarousel from '../DestinationCarousel';
import LoadingSpinner from '../Common/Spinner';

const RecentDestinations = () => {
    const { addNotification } = useNotificationContext();
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
        <div className="recent-carousel" >
            <h4>Recent Destinations</h4>
            <DestinationCarousel destinations={destinations} />
        </div>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : recentDestinations}
        </>
    );
}

export default RecentDestinations;