import './DestinationCarousel.css';

// import DestinationCard from "./DestinationCard";
import { useParams, useNavigate, Link } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

const categories = [
    { value: 'Mountains', text: 'Mountains' },
    { value: 'Sea-and-ocean', text: 'Sea and ocean' },
    { value: 'Caves', text: 'Caves' },
    { value: 'Lakes-and-rivers', text: 'Lakes and rivers' },
    { value: 'Historical-places', text: 'Historical places' },
    { value: 'Other', text: 'Other' },
]

const DestinationCarousel = ({
    destinations
}) => {
    const navigate = useNavigate();

    const onClickHandler = (e) => {
        e.preventDefault();
        const destinationId = e.currentTarget.id
        // console.log(destinationId);

        navigate(`/details/${destinationId}`);
    }

    const carousel = (
        <Carousel >
            {destinations.map(x => (
                <Carousel.Item interval={3000} id={x._id} key={x._id} onClick={onClickHandler}>
                    <div className='card-img'>
                        <img
                            className="d-block w-100"
                            src={x.imageUrl}
                            // alt="Image One"
                        />
                    </div>
                    <Carousel.Caption>
                        <h3>Title: {x.title}</h3>
                        {/* <p>Category: {x.category}</p> */}
                        <p>Category: {categories.find(c => c.value == x.category).text}</p>
                        {/* {console.log(categories.find(c => c.value == x.category).text)} */}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )

    return (
        <>
            {destinations.length > 0
                ? carousel
                : <p className="no-destinations">No destinations in database!</p>
            }
        </>
    );
}

export default DestinationCarousel;