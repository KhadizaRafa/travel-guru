import { MDBCol, MDBRow } from 'mdbreact';
import React from 'react';
import star from "../../resources/Icon/star_1_.png"
import bed1 from "../../resources/Image/Rectangle 26.png"
import bed2 from "../../resources/Image/Rectangle 27.png"
import bed3 from "../../resources/Image/Rectangle 28.png"
import './BookingRoomDetails.css'

const BookingRoomDetails = (props) => {
    const {key,title,bedding,facilities,cancel,rating,ratingCount,price} = props.roomdetails;
    let {image} = props.roomdetails;
    if(key === '1')
        image = bed1
    else if(key === '2')
        image = bed2
    else
        image = bed3;

    return (
        <div>
        <MDBRow className="p-3">
            <MDBCol md="4">
                <img src={image} style={{width:"100%"}} alt="Bed One" />
            </MDBCol>
            <MDBCol md="6" className="content">
                <h5>{title}</h5>
                <p>{bedding}</p>
                <p>{facilities}</p>
                <p>{cancel}</p>
                <div className='d-flex rating'>
                    <img src={star} alt={"stars"}/>
                    <pre>{rating}({ratingCount})  ${price}/night</pre>
                </div>
            </MDBCol>
        </MDBRow>
        </div>
        
    );
};

export default BookingRoomDetails;