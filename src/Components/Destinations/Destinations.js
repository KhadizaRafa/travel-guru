import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Destination.css';

const Destinations = (props) => {
    const { key, title, image } = props.destination;
    return (
        <div>
            <Link to={"/destination/" + key}>
                <Card className="bg-dark text-white box">
                    <Card.Img src={image} alt="Card image" className="card-img" />
                    <Card.ImgOverlay>
                        <Card.Title className="card-title">{title}</Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </Link>
        </div>
    );
}


export default Destinations;