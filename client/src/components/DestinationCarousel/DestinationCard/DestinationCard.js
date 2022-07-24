import './DestinationCard.css';

import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';

const DestinationCard = ({
    innerRef
}) => {

    // console.log(destination);

    return (
        <Carousel.Item interval={3000}>
            <img
                className="d-block w-100"
                src={innerRef.imageUrl}
                alt="Image One"
            />
            <Carousel.Caption>
                <h3>Title: {innerRef.title}</h3>
                <p>Category: {innerRef.category}</p>
            </Carousel.Caption>
        </Carousel.Item>
    );
}

export default DestinationCard;