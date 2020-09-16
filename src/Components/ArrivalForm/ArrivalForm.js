import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const ArrivalForm = (props) => {
    const { title } = props.formInfo;
    const [selectedDate,setSelectedDate] = useState(null)
    return (
        <Form>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Origin</Form.Label>
                <Form.Control type="text" value="Dhaka" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Destination</Form.Label>
                <Form.Control type="text" value={title} />
            </Form.Group>
             <Form.Row className="d-flex">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label style={{display: 'block'}}>From</Form.Label>
                    <DatePicker 
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat='dd/mm/yyyy'
                        minDate={new Date()}
                    ></DatePicker>
                </Form.Group> 

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label style={{display: 'block'}}>To</Form.Label>
                    <DatePicker 
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat='dd/mm/yyyy'
                    ></DatePicker>
                </Form.Group>
            </Form.Row>

            <button className="btn btn-warning w-100">Start Booking</button>
        </Form>
    );
};

export default ArrivalForm;