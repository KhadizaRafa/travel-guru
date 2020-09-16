import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Destinations = (props) => {
    const {key,title,image} = props.destination;
    console.log(props)
    return (
        <div>
             
            <Link to={"/destination/"+key}>
                <Card className="bg-dark text-white">
                <Card.Img src={image} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title>{title}</Card.Title>
                    {/* <Card.Text>
                        
                     </Card.Text>
                    <Card.Text>Last updated 3 mins ago</Card.Text> */}
                </Card.ImgOverlay>
                </Card>
            </Link>
        </div>
    );
};

export default Destinations;