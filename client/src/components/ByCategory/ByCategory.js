import './ByCategory.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import DestinationCarousel from '../Common/DestinationCarousel';
import LoadingSpinner from '../Common/Spinner';
import NoDestinations from '../Common/NoDestinations';

const MyDestinations = () => {
    const { category } = useParams();
    const [destinations, setDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        destinationService.getByCategory(category)
            .then(destinationResult => {
                setDestinations(destinationResult);
                setIsLoading(false);
            });
    }, [category]);

    const byCategory = (
        destinations.length > 0
        ? <div className="by-category-carousel" >
            <h4>
                {category.includes('-')
                    ? ' ' + category.replaceAll("-", " ")
                    : ' ' + category
                }: 
                {destinations.length}
            </h4>
            <DestinationCarousel destinations={destinations} />
        </div>
        : <NoDestinations/>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : byCategory}
        </>
    );
}

export default MyDestinations;