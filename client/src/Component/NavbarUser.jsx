import React, {useContext, useState} from "react";
import { Nav, Navbar,Container,Dropdown } from "react-bootstrap";
import Logo from "../Assets/img/LogoBlueBandFlix.png"
import Avatar from "../Assets/img/avatar.png"
import Profile from "../Assets/img/profile.svg"
import Pay from "../Assets/img/pay.svg"
import Logout from "../Assets/img/logout.svg"
import {useNavigate, Link} from 'react-router-dom'
import { UserContext } from "../Context/userContext";


export default function NavUser() {

  const [state, dispatch] = useContext(UserContext)

  let Navigate = useNavigate()

  const logout = () => {
    console.log(state)
    dispatch({
      type: "LOGOUT"
    })
    Navigate("/auth")
  }


    return (
       <Navbar style={{ backgroundColor: "#2B3467" }}>
        <Container>
          <Nav className="fw-bold fs-6">
            <Nav.Link as={Link} to='/' className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to='/tvseries' className="text-white">Tv Shows</Nav.Link>
            <Nav.Link as={Link} to='/movie' className="text-white">Movies</Nav.Link>
          </Nav>
          <Navbar.Brand as={Link} to='/'><img src={Logo} alt="logo" /></Navbar.Brand>
          <Nav className="justify-content-end">
          <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: "#2B3467", border: "none" }}>
      <img src={Avatar} alt="avatar" style={{ width:"50px", height:"50px"}}/>
      </Dropdown.Toggle>

      <Dropdown.Menu className="fs-6">
        <Dropdown.Item as={Link} to="/profile">
        <img src={Profile} alt="profile" /> <b>Profile</b>
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/payment">
           <img src={Pay} alt="pay" /> <b>Payment</b>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout}>
            <img src={Logout} alt="logout" /> <b>Logout</b>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            
          </Nav>
        </Container>
      </Navbar>
    )
}
