import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    useLocation
} from "react-router-dom";
import BookingPageMap from "../BookingPageMap/BookingPageMap";
import BookingRoomDetails from "../BookingRoomDetails/BookingRoomDetails";
import fakeRoomData from '../../fakeData/roomDetails'
import fakeDestinationData from '../../fakeData/destination'
import './Booking.css'


const Booking = () => {
    const fakethreeRooms = fakeRoomData.slice(0,10);
    const [room, setRoom] = useState(fakethreeRooms)

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const destination = query.get("key")
    const arrivalDate = query.get("from")
    const departDate = query.get("to")
    const destinationDetails = fakeDestinationData.find(dest => dest.key === destination);

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="7">
                    <small>From {arrivalDate} To {departDate}</small>
                    <h5>Stay in {destinationDetails.title}</h5>
                   {
                       room.map(roomdetails => <BookingRoomDetails roomdetails={roomdetails} key={roomdetails.key}></BookingRoomDetails>)
                   }
                </MDBCol>
                <MDBCol md="5">
                <div className="mapouter mt-4">
                    <div className="gmap_canvas">
                        <iframe width="600" height="820" id="gmap_canvas" src={destinationDetails.mapUrl} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                        <a href="https://www.whatismyip-address.com/divi-discount/"></a>
                    </div>
                    
                </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Booking;