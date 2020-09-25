import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../resources/Logo.png'
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import './Header.css'
import { UserContext } from '../../App';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div  className="navContainer">
        <Container>
            <Navbar expand="lg" style={{ boxShadow: "none" }}>
                <Link to="/home">
                    <Navbar.Brand className="logoImg"> <img src={logo} alt="" style={{ width: "180px"}} /></Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="mx-auto">
                    <Form inline>
                        <FormControl type="text" placeholder="Search your Destination..." className="mr-sm-2 search pr-5" />
                    </Form>
                    <Nav>
                        <Nav.Link to='/news' className='navText'>News</Nav.Link>
                        <Nav.Link to='/destination' className='navText'>Destination</Nav.Link>
                        <Nav.Link to='/blog' className='navText'>Blog</Nav.Link>
                        <Nav.Link to='/contact' className='navText'>Contact</Nav.Link>
                        <Nav.Link className='navText'>{loggedInUser.email}</Nav.Link>
                        {
                            loggedInUser.isSignedIn ?
                                <Button className="btn btn-warning" onClick={()=>setLoggedInUser({})}>LogOut</Button> : <Link to='/login'><Button className="btn btn-warning">Login</Button></Link>
                        }

                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        </Container>
        </div>
    );
};

export default Header;