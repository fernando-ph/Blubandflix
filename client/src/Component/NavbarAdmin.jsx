import React, {useContext} from "react";
import { Nav, Navbar, Container, Dropdown} from "react-bootstrap"
import Logout from "../Assets/img/LogoMasuk.png"
import Film from "../Assets/img/LogoFilm.png"
import Logo from "../Assets/img/LogoBlueBandFlix.png"
import Avatar from "../Assets/img/avatar.png"
import {useNavigate, Link} from "react-router-dom"
import { UserContext } from "../Context/userContext";


export default function NavAdmin() {

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
            <Navbar style={{ backgroundColor: '#2B3467', marginBottom: '20px' }} data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/admin" ><img src={Logo} alt="logo" /></Navbar.Brand>
          <Nav className="justify-content-end">
          <Dropdown>
      <Dropdown.Toggle variant="white" id="dropdown-basic">
      <img src={Avatar} alt="avatar" style={{ width:"50px", height:"50px"}}/>
      </Dropdown.Toggle>

      <Dropdown.Menu className="fs-6" style={{ backgroundColor: '#2b3467' }}>
        <Dropdown.Item as={Link} to="/filmadmin" className="fw-bold text-light">
        <img src={Film} alt="film" /> Film
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="fw-bold text-light" onClick={logout} >
            <img src={Logout} alt="logout" /> Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            
          </Nav>
        </Container>
      </Navbar>
    )
}
