import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useHistory } from 'react-router-dom';
import * as moment from 'moment'
import './ArrivalForm.css'

const ArrivalForm = (props) => {
    const {key,title} = props.formInfo;
    const [selectedFromDate,setSelectedFromDate] = useState(null);
    const [selectedToDate,setSelectedToDate] = useState(null)
    const history = useHistory();

    const handleBookings = () =>{
        
        const fromDate = moment(selectedFromDate).format('L');
        const toDate = moment(selectedToDate).format('L')
        history.push(`/booking?key=${key}&from=${fromDate}&to=${toDate}`)
    }
    return (
        <Form className="arrivalForm">
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Origin</Form.Label>
                <Form.Control type="text" value="Dhaka" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Destination</Form.Label>
                <Form.Control type="text" defaultValue={title} />
            </Form.Group>
             <Form.Row className="d-flex">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label style={{display: 'block'}}>From</Form.Label>
                    <DatePicker 
                        selected={selectedFromDate}
                        onChange={date => setSelectedFromDate(date)}
                        dateFormat='dd/MM/yyyy'
                        minDate={new Date()}
                        defaultValue={null}
                        className="calendar"
                    >
                    </DatePicker>
                </Form.Group> 

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label style={{display: 'block'}}>To</Form.Label>
                    <DatePicker 
                        selected={selectedToDate}
                        onChange={date => setSelectedToDate(date)}
                        dateFormat='dd/MM/yyyy'
                        minDate={new Date()}
                        defaultValue={null}
                        className="calendar"
                    ></DatePicker>
                </Form.Group>
            </Form.Row>
            
            <button className="btn btn-warning w-100" onClick={handleBookings}>Start Booking</button>
        </Form>
    );
};

export default ArrivalForm;