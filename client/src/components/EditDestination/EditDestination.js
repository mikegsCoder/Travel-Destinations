import './EditDestination.css';

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import useDestinationState from '../../hooks/useDestinationState';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
// import ConfirmDialog from '../Common/ConfirmDialog';
import LoadingSpinner from '../Common/Spinner';
import { Alert } from 'react-bootstrap';

const categories = [
    { value: 'Mountains', text: 'Mountains' },
    { value: 'Sea-and-ocean', text: 'Sea and ocean' },
    { value: 'Caves', text: 'Caves' },
    { value: 'Lakes-and-rivers', text: 'Lakes and rivers' },
    { value: 'Historical-places', text: 'Historical places' },
    { value: 'Other', text: 'Other' },
]

const Edit = () => {
    const navigate = useNavigate();
    const { destinationId } = useParams();
    const { addNotification } = useNotificationContext();
    const [errors, setErrors] = useState({name: false})
    const [destination, setDestination] = useDestinationState(destinationId);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     destinationService.getDestinationById(destinationId)
    //         .then(result => {
    //             setDestination(result);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, []);

    const destinationEditSubmitHandler = (e) => {
        e.preventDefault();

        let destinationData = Object.fromEntries(new FormData(e.currentTarget));

        setIsLoading(true);

        destinationService.updateDestination(destination._id, destinationData)
            .then(result => {
                setIsLoading(false);
                addNotification('Destination successfully edited.', types.success);
                navigate('home-page');
            })
            .catch(err => {
                addNotification(err, types.danger);
                setIsLoading(false);
            });
    }

    // rila Id: "b559bd24-5fb6-4a42-bc48-40c17dea649d"

    const titleChangeHandler = (e) => {
        let currentTitle = e.target.value;

        if (currentTitle.length < 3) {
            setErrors(state => ({...state, name: 'Destination title should be at least 3 characters long!'}))
        } else if (currentTitle.length > 30) {
            setErrors(state => ({...state, name: 'Destination title should be max 30 characters long!'}))
        } else {
            setErrors(state => ({...state, name: false}))
        }
    };

    const descriptionChangeHandler = (e) => {
        let currentDescription = e.target.value;

        if (currentDescription.length < 3) {
            setErrors(state => ({...state, name: 'Destination description should be at least 3 characters long!'}))
        } else if (currentDescription.length > 200) {
            setErrors(state => ({...state, name: 'Destination description should be max 200 characters long!'}))
        } else {
            setErrors(state => ({...state, name: false}))
        }
    }

    const imgUrlChangeHandler = (e) => {
        let currentImgUrl = e.target.value;

        if (currentImgUrl.length < 15) {
            setErrors(state => ({...state, name: 'Image URL should be at least 15 characters long!'}))
        } else {
            setErrors(state => ({...state, name: false}))
        }
    }

    const editDestinationPage = (
        <section id="edit-page" className="edit">
            <Alert variant="danger" show={errors.name}>{errors.name}</Alert>
            <form id="edit-form" method="POST" onSubmit={destinationEditSubmitHandler}>
                <fieldset>
                    <legend>Edit Destination</legend>
                    <p className="field">
                        <label htmlFor="title">Title</label>
                        <span className="input" style={{borderColor: errors.name ? 'red' : 'inherit'}}>
                            <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                spellCheck="false" 
                                placeholder="Title..."
                                defaultValue={destination.title} 
                                onChange={titleChangeHandler} 
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea 
                                name="description" 
                                id="description" 
                                spellCheck="false" 
                                placeholder="Description..."
                                defaultValue={destination.description} 
                                onChange={descriptionChangeHandler} 
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="image">Image</label>
                        <span className="input">
                            <input 
                                type="text" 
                                name="imageUrl" 
                                id="image" 
                                spellCheck="false" 
                                defaultValue={destination.imageUrl} 
                                placeholder="Image URL..." 
                                onChange={imgUrlChangeHandler}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="category">Category</label>
                        <span className="input">
                            <select 
                                id="category" 
                                name="category" 
                                defaultValue={destination.category} 
                                onChange={(e) => setDestination(s => ({...s, type: e.target.value}))}>
                                
                                {categories.map(x =>
                                    <option key={x.value} value={x.value}>{x.text}</option>)
                                }
                            </select>
                        </span>
                    </p>
                    <button 
                        type="submit" 
                        className="btn-secondary btn-block" 
                        id="edit-destination-btn">
                            Edit Destination
                    </button>
                </fieldset>
            </form>
        </section>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : editDestinationPage}
        </>
    );
}

export default Edit;