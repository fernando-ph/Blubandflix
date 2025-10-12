import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../Assets/img/LogoBlueBandFlix.png"
import IconBlue from "../Assets/img/iconBlue.png"
import { Button, Modal, Form } from "react-bootstrap";
import Login from "./Modal/Modal-Login";
import Register from "./Modal/Modal-Register"
import useAuthStore from "../Store/authStore";
import { useNavigate } from "react-router-dom";

export default function TopNav(props) {
    const { isAuthenticated, initializeAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
      initializeAuth();
    }, [initializeAuth]);

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow (true)

    const [register, setRegister] = useState(false)
    const handleCloseRegister = () => setRegister(false)
    const handleShowRegister = () => setRegister(true)


    return (
        <>
        <Navbar expand="lg" style={{ backgroundColor: '#2B3467' }} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} alt="logo" style={{ maxWidth: '150px', height: 'auto' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-grow-1">
              <Nav.Link href="#home"><img src={IconBlue} alt="icon" style={{ width: '30px', height: '30px', marginRight: '5px' }} />Home</Nav.Link>
              <Nav.Link href="#features">Tv Shows</Nav.Link>
              <Nav.Link href="#pricing">Movies</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              {isAuthenticated ? (
                null
              ) : (
                <>
                  <Button variant="light" className="me-3" style={{color:"red"}} onClick={handleShow}>Login</Button>
                  <Button variant="danger" onClick={handleShowRegister}>Register</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
        <Modal.Body style={{backgroundColor:"#2b3467", width:"450px", borderRadius:"8px", textAlign:"center"}}>
            <Login />
            <Form.Text style={{color:"white"}}>Dont have an account?<b style={{cursor:"pointer"}} onClick={() => {
          handleShowRegister();
          handleClose();
        }}> Click here to register</b></Form.Text>
        </Modal.Body>
      </Modal>

      <Modal show={register} onHide={handleCloseRegister} {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Body style={{backgroundColor:"#1F1F1F", width:"450px", borderRadius:"8px", textAlign:"center"}} >
        <Register />
        <Form.Text style={{color:"white"}}>Already have an account? <b style={{cursor:"pointer"}} onClick={() => {
          handleShow();
          handleCloseRegister();
        }}>Click here to login</b></Form.Text>
        </Modal.Body>
      </Modal>
      </>
    )
}
