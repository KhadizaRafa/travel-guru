import React, { useState } from 'react';
import { CardDeck, Col, Row } from 'react-bootstrap';
import fakeData from '../../fakeData/destination';
import './Home.css';
import Destinations from '../Destinations/Destinations';

const Home = () => {
    const fakethreeData = fakeData.slice(0, 10);
    const [destinations, setDestinations] = useState(fakethreeData)
    return (
        <Row className="home">
            <Col md={5}>
                <div className='p-5 '>
                    <h1>COX'S BAZAR</h1>
                    <p>Cox's Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh</p>
                </div> 
            </Col>
            <Col md={6}>
                <CardDeck>
                    {
                        destinations.map(destination => <Destinations destination={destination} key={destination.key}></Destinations>)
                    }
                </CardDeck>
            </Col>
        </Row>
    );
};

export default Home;