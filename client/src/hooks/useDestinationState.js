import { useState, useEffect } from 'react';

import * as destinationService from '../services/destinationService';

const useDestinationState = (destinationId) => {
    const [destination, setDestination] = useState({});

    useEffect(() => {
        destinationService.getDestinationById(destinationId)
            .then(destinationResult => {
                setDestination(destinationResult);
            });
    }, [destinationId]);

    return [
        destination,
        setDestination
    ];
};

export default useDestinationState;