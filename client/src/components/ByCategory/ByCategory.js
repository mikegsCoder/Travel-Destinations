import './ByCategory.css';

import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import DestinationCarousel from '../DestinationCarousel';
import LoadingSpinner from '../Common/Spinner';

const categories = [
    { value: 'Mountains', text: 'Mountains' },
    { value: 'Sea-and-ocean', text: 'Sea and ocean' },
    { value: 'Caves', text: 'Caves' },
    { value: 'Lakes-and-rivers', text: 'Lakes and rivers' },
    { value: 'Historical-places', text: 'Historical places' },
    { value: 'Other', text: 'Other' },
]

const MyDestinations = () => {
    const { addNotification } = useNotificationContext();
    const { category } = useParams();
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // console.log(category);

    useEffect(() => {
        setIsLoading(true);

        destinationService.getByCategory(category)
            .then(destinationResult => {
                setDestinations(destinationResult);
                setIsLoading(false);
            })
            .catch(err => {
                addNotification(err, types.danger);
                setIsLoading(false);
            });
    }, [category]);

    // console.log(destinations)

    const byCategory = (
        <div className="my-destinatins-carousel" >
            <h4>{categories.find(c => c.value == category).text}: {destinations.length}</h4>
            <DestinationCarousel destinations={destinations} />
        </div>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : byCategory}
        </>
    );
}

export default MyDestinations;