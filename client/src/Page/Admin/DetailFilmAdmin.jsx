import React, {useState} from "react";
import Vider from "../../Assets/img/trailer.mp4"
import NavAdmin from "../../Component/NavbarAdmin";
import {Row, Col, Button, Modal} from "react-bootstrap"
import { API } from "../../Config/Api"
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function DetailFilmAdmin() {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow (true)

    let {id} = useParams()

    let {data : movieadmin } = useQuery("movieAdminCache", async () => {
        const response = await API.get(`/movie/${id}`)
        return response.data.data
    })

    return (
        
        <div>
            <NavAdmin />
        <div style={{backgroundColor:"black"}}>
                <video controls style={{ width: '100%'}}>
                <source src={Vider} type="video/mp4" />
                </video>
            </div>
            <div style={{backgroundColor:"black", padding:"20px", color:"Gray", fontWeight:"bold"}}>
                <hr />
                <Row>
                    <Col>
                        <div>
                            <Row className="ps-5">
                                <Col xs={2}>
                                    <img src={movieadmin?.image} alt="cover" style={{height:"300px"}} />
                                </Col>
                                <Col>
                                    <div>
                                        <h3>{movieadmin?.title}</h3>
                                        <i>{movieadmin?.year}</i><Button variant="outline-light" className="ms-2 mb-2">Movies</Button>
                                        <p>{movieadmin?.description}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>

            

            </div>
    )
}