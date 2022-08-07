import './CreateDestination.css';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import * as dataValidation from '../../services/destinationDataValidationService';
import * as constants from '../../constants/constants';
import { useAuthContext } from '../../contexts/AuthContext';
import { useApplicationNotificationContext, types } from '../../contexts/ApplicationNotificationContext';
import { useInvalidDataNotificationContext, debounce } from '../../contexts/InvalidDataNotificationContext';
import LoadingSpinner from '../Common/Spinner';

const CreateDestination = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { addNotification } = useApplicationNotificationContext();
    const { addInvalidDataNotification } = useInvalidDataNotificationContext();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const onDestinationCreate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const latitude = formData.get('latitude');
        const longitude = formData.get('longitude');
        const category = formData.get('category');

        const { validationResult, invalidFields } = dataValidation.destinationFormValidation(title, description, imageUrl, latitude, longitude);
        setErrors(invalidFields);

        if (validationResult.length != 0) {
            addInvalidDataNotification(validationResult);
            return;
        };

        setIsLoading(true);

        const destinationData = {
            title,
            description,
            imageUrl,
            category,
            latitude,
            longitude
        };

        destinationService.createDestination(destinationData, user.accessToken)
            .then(result => {
                setIsLoading(false);
                addNotification(constants.appNotificationMessages.destinationCreateSuccess, types.success);
                navigate('/home-page');
            })
            .catch(err => {
                addNotification(err, types.danger);
                setIsLoading(false);
            });
    };

    const cancelSubmitHandler = (e) => {
        e.preventDefault();
        navigate('/my-destinations');
    };

    const verifyChangeHandlerData = (name, value) => {
        let validationResult = false;

        switch (name) {
            case 'title':
                validationResult = dataValidation.titleValidation(value);
                break;
            case 'description':
                validationResult = dataValidation.descriptionValidation(value);
                break;
            case 'image':
                validationResult = dataValidation.imgUrlValidation(value);
                break;
            case 'latitude':
                validationResult = dataValidation.latitudeValidation(value);
                break;
            case 'longitude':
                validationResult = dataValidation.longitudeValidation(value);
                break;
        };

        if (validationResult) {
            addInvalidDataNotification(validationResult);
            setErrors(state => [...state, name]);
        } else if (errors.includes(name)) {
            setErrors(state => state.filter(x => x != name));
        };
    };

    const titleChangeHandler = debounce((e) =>
        verifyChangeHandlerData('title', e.target.value)
    );

    const descriptionChangeHandler = debounce((e) =>
        verifyChangeHandlerData('description', e.target.value)
    );

    const imgUrlChangeHandler = debounce((e) =>
        verifyChangeHandlerData('image', e.target.value)
    );

    const latitudeChangeHandler = debounce((e) =>
        verifyChangeHandlerData('latitude', e.target.value)
    );

    const longitudeChangeHandler = debounce((e) =>
        verifyChangeHandlerData('longitude', e.target.value)
    );

    const createPage = (
        <section id="create-page" className="create">
            <form id="create-form" onSubmit={onDestinationCreate} method="POST">
                <fieldset>
                    <legend>Add new Destination</legend>
                    <p className="field">
                        <label htmlFor="title">Name</label>
                        <span className="input">
                            <input
                                type="text"
                                name="title"
                                id="title"
                                spellCheck="false"
                                placeholder="Title..."
                                style={{
                                    borderColor: errors.includes('title')
                                        ? 'red'
                                        : '#666'
                                }}
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
                                style={{
                                    borderColor: errors.includes('description')
                                        ? 'red'
                                        : '#666'
                                }}
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
                                placeholder="Image URL..."
                                style={{
                                    borderColor: errors.includes('image')
                                        ? 'red'
                                        : '#666'
                                }}
                                onChange={imgUrlChangeHandler}
                            />
                        </span>
                    </p>
                    <p className='field geo-location'>
                        <span>Geolocation</span>
                        <span>Need help: <a href="https://www.latlong.net/" target="_blank">www.latlong.net</a></span>
                    </p>
                    <p className="field location">
                        <label htmlFor="image">Lattitude:</label>
                        <span className="input">
                            <input
                                type="number"
                                min={-90}
                                max={90}
                                step={0.000001}
                                required
                                name="latitude"
                                id="latitude"
                                spellCheck="false"
                                placeholder="lat..."
                                style={{
                                    borderColor: errors.includes('latitude')
                                        ? 'red'
                                        : '#666'
                                }}
                                onChange={latitudeChangeHandler}
                            />
                        </span>
                        <label htmlFor="image">Longitude:</label>
                        <span className="input">
                            <input
                                type="number"
                                min={-180}
                                max={180}
                                step={0.000001}
                                required
                                name="longitude"
                                id="longitude"
                                spellCheck="false"
                                placeholder="lng..."
                                style={{
                                    borderColor: errors.includes('longitude')
                                        ? 'red'
                                        : '#666'
                                }}
                                onChange={longitudeChangeHandler}
                            />
                        </span>
                    </p>

                    <p className="field">
                        <label htmlFor="category">Category</label>
                        <span className="input">
                            <select id="category" name="category">
                                <option value="Mountains">Mountains</option>
                                <option value="Sea-and-ocean">Sea and ocean</option>
                                <option value="Lakes-and-rivers">Lakes and rivers</option>
                                <option value="Caves">Caves</option>
                                <option value="Historical-places">Historical places</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <div id='edit-buttons'>
                        <button
                            type="cancel"
                            className="btn-secondary btn-block"
                            id="cancel-create-destination-btn"
                            onClick={cancelSubmitHandler}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-secondary btn-block"
                            id="create-btn"
                        >
                            Add Destination
                        </button>
                    </div>
                </fieldset>
            </form>
        </section>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : createPage}
        </>
    );
};

export default CreateDestination;