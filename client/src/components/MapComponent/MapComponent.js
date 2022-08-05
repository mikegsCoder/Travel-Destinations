import './MapComponent.css';
import 'leaflet/dist/leaflet.css';

import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

import L from 'leaflet';
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as destinationService from '../../services/destinationService';
import LoadingSpinner from '../Common/Spinner';

const icon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow
});

const MapComponent = () => {

    const navigate = useNavigate();
    const { destinationId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState([42.621831, 25.861923]);
    const [destination, setDestination] = useState({});

    useEffect(() => {
        setIsLoading(true);

        destinationService.getDestinationById(destinationId)
            .then(destinationResult => {
                setDestination(destinationResult);
                setPosition([destinationResult.latitude, destinationResult.longitude]);
                setIsLoading(false);
            });
    }, [destinationId]);

    const imgClickHandler = (e) => {
        e.preventDefault();
        navigate(`/details/${destinationId}`);
    }

    const map = (
        <>
            <h4 className='map-heding'>
                Title: {destination.title},
                Category: {destination.category?.includes('-')
                            ? ' ' + destination.category.replaceAll("-", " ")
                            : ' ' + destination.category}
            </h4>
            <div className='map-container'>
                <MapContainer
                    center={position}
                    zoom={13}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={icon}>
                        <Popup>
                            Title: {destination.title} 
                            <br /> 
                            Category:
                            {
                                destination.category?.includes('-')
                                    ? ' ' + destination.category.replaceAll("-", " ")
                                    : ' ' + destination.category
                            }
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div className='dest-img-wrapper'>
                <img 
                    src={destination.imageUrl} 
                    alt="destination-img" 
                    onClick={imgClickHandler}
                />
            </div>
        </>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : map}
        </>
    );
}

export default MapComponent;