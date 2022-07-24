import './CreateDestination.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as destinationService from '../../services/destinationService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import LoadingSpinner from '../Common/Spinner';
import { Alert } from 'react-bootstrap';

const Create = () => {
    const { addNotification } = useNotificationContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ name: false })
    const [isLoading, setIsLoading] = useState(false);

    const onDestinationCreate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const category = formData.get('category');

        let validationResult = '';

        if (title.length < 3 || title.length > 30) {
            validationResult += 'Invalid title';
            document.getElementById('title').style.borderColor = 'red';
        }
        else {
            document.getElementById('title').style.borderColor = '#666';
        }

        if (description.length < 3 || description.length > 200) {
            validationResult.length == 0
                ? validationResult = 'Invalid description!'
                : validationResult += ' and description!'
            document.getElementById('description').style.borderColor = 'red';
        } else {
            validationResult.length > 0
                ? validationResult += '!'
                : validationResult = '';
            document.getElementById('description').style.borderColor = '#666';
        }

        if (imageUrl.length < 15) {
            validationResult += ' Image URL is too short!'
            document.getElementById('image').style.borderColor = 'red';
        } else {
            document.getElementById('image').style.borderColor = '#666';
        }

        if (validationResult.length != 0) {

            // async function invalidRegisterData () {
            //     setErrors(state => ({ ...state, name: validationResult }));
            //     await new Promise(resolve => setTimeout(resolve, 3000));
            //     setErrors(state => ({ ...state, name: false }));
            //   }

            // invalidRegisterData();

            (async () => {
                setErrors(state => ({ ...state, name: validationResult }));
                await new Promise(resolve => setTimeout(resolve, 5000));
                setErrors(state => ({ ...state, name: false }));
            })();

            return;
        };
        
        setIsLoading(true);

        destinationService.createDestination({
            title,
            description,
            imageUrl,
            category,
        }, user.accessToken)
            .then(result => {
                setIsLoading(false);
                addNotification('Destination successfully created.', types.success);
                navigate('/home-page');
            })
            .catch(err => {
                addNotification(err, types.danger);
                setIsLoading(false);
            });
    };

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    };

    const titleChangeHandler = debounce((e) => titleValidation(e));

    const titleValidation = (e) => {
        let currentTitle = e.target.value;

        if (currentTitle.length < 3) {
            setErrors(state => ({ ...state, name: 'Destination title should be at least 3 characters long!' }))
        } else if (currentTitle.length > 30) {
            setErrors(state => ({ ...state, name: 'Destination title should be max 30 characters long!' }))
        } else {
            setErrors(state => ({ ...state, name: false }))
        };
    };

    const descriptionChangeHandler = debounce((e) => descriptionValidation(e));

    const descriptionValidation = (e) => {
        let currentDescription = e.target.value;

        if (currentDescription.length < 3) {
            setErrors(state => ({ ...state, name: 'Destination description should be at least 3 characters long!' }))
        } else if (currentDescription.length > 200) {
            setErrors(state => ({ ...state, name: 'Destination description should be max 200 characters long!' }))
        } else {
            setErrors(state => ({ ...state, name: false }))
        };
    };

    const imgUrlChangeHandler = debounce((e) => imgUrlValidation(e));

    const imgUrlValidation = (e) => {
        let currentImgUrl = e.target.value;

        if (currentImgUrl.length < 15) {
            setErrors(state => ({ ...state, name: 'Image URL should be at least 15 characters long!' }))
        } else {
            setErrors(state => ({ ...state, name: false }))
        };
    };

    const createPage = (
        <>
            <Alert variant="danger" show={errors.name}>{errors.name}</Alert>

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
                                    onChange={imgUrlChangeHandler}
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
                                    <option value="Historical-places">Historicl places</option>
                                    <option value="Other">Other</option>
                                </select>
                            </span>
                        </p>
                        <button type="submit" className="btn-secondary btn-block" id="create-btn">Add Destination</button>
                    </fieldset>
                </form>
            </section>
        </>
    );

    return (
        <>
            {isLoading ? <LoadingSpinner /> : createPage}
        </>
    );
}

export default Create;