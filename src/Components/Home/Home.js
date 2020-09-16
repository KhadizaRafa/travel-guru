import React, { useState } from 'react';
import { CardDeck } from 'react-bootstrap';
import fakeData from '../../fakeData/destination'
import Destinations from '../Destinations/Destinations';
const Home = () => {
    const fakethreeData = fakeData.slice(0,10);
    const [destinations, setDestinations] = useState(fakethreeData)
    return (
        <div>
            
                  <CardDeck>
                    {
                        destinations.map(destination => <Destinations destination={destination} key={destination.key}></Destinations>)
                    }
                  </CardDeck>
     
        </div>
    );
};

export default Home;