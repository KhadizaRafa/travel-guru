import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/destination'
import ArrivalForm from '../ArrivalForm/ArrivalForm';
import Destinations from '../Destinations/Destinations';
const DestinationDetails = () => {
    const { destinationKey } = useParams();
    const destinationDetails = fakeData.find(dest => dest.key === destinationKey);

    return (
        <Container>
            <Row>
                <Col md={5}>
                    <h1>{destinationDetails.title}</h1>
                    <p>{destinationDetails.description}</p> 
                </Col>
                <Col md={5}>
                    <ArrivalForm formInfo={destinationDetails} key={destinationKey}></ArrivalForm>
                </Col>
                {/* <Destinations destination={destinationDetails} key={destinationKey}></Destinations> */}
                
            </Row>
        </Container>
      
    );
};

export default DestinationDetails;