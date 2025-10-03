import React, {useState} from "react";
import Vider from "../../Assets/img/trailer.mp4"
import NavAdmin from "../../Component/NavbarAdmin";
import {Row, Col, Button, Modal} from "react-bootstrap"
import ModalAdd from "../../Component/Modal/Modal-AddEpisode"
import { API } from "../../Config/Api"
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function DetailFilmAdmin() {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow (true)

    let { id } = useParams()

    let { data : tvadmin } = useQuery("tvadminCache", async () => {
        const response = await API.get(`/tv/${id}`)
        return response.data.data
    })

    console.log("data tv :" , tvadmin)

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
                                <Col xs={5}>
                                    <img src={tvadmin?.image} alt="cover" style={{height:"300px"}} />
                                </Col>
                                <Col>
                                    <div>
                                        <h3>{tvadmin?.title}</h3>
                                        <i>{tvadmin?.year}</i><Button variant="outline-light" className="ms-2 mb-2">TV Series</Button>
                                        <p>{tvadmin?.description}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col>
                        <div style={{color:"white", textAlign:"end", paddingRight:"50px"}}>
                            <Button style={{backgroundColor:"red", border:"none", width:"40%"}} onClick={handleShow}>Add Episode</Button>

                        </div>
                    </Col>
                </Row>
            </div>

            <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
                <Modal.Body className="rounded" style={{backgroundColor:"#1F1F1F", width:"100%",}}>
                    <ModalAdd />
                </Modal.Body>
            </Modal>

            </div>
    )
}