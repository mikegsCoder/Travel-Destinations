import { useState, useEffect, useMemo } from 'react';

import * as destinationService from '../services/destinationService';

const useDestinationState = (destinationId) => {
    // console.log(destinationId);

    const [destination, setDestination] = useState({});

    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])

    useEffect(() => {
        destinationService.getDestinationById(destinationId, controller.signal)
            .then(destinationResult => {
                setDestination(destinationResult);
            })

        return () => {
            controller.abort();
        }
    }, [destinationId, controller]);

    return [
        destination,
        setDestination
    ]
};

export default useDestinationState;