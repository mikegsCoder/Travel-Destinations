import './DestinationCarousel.css';
import 'bootstrap/dist/css/bootstrap.css';

import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

const DestinationCarousel = ({
    destinations
}) => {
    const navigate = useNavigate();

    const onClickHandler = (e) => {
        e.preventDefault();
        const destinationId = e.currentTarget.id

        navigate(`/details/${destinationId}`);
    };

    const carousel = (
        <Carousel >
            {destinations.map(x => (
                <Carousel.Item interval={3000} id={x._id} key={x._id} onClick={onClickHandler}>
                    <div className='card-img'>
                        <img
                            className="d-block w-100"
                            src={x.imageUrl}
                        />
                    </div>
                    <Carousel.Caption>
                        <h3>Title: {x.title}</h3>
                        <p>Category: {x.category?.includes('-')
                                    ? ' ' + x.category.replaceAll("-", " ")
                                    : ' ' + x.category}
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );

    return (
        <>
            {destinations.length > 0
                ? carousel
                : <p className="no-destinations">No destinations in database!</p>
            }
        </>
    );
};

export default DestinationCarousel;