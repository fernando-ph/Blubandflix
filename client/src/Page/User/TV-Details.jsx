import React from "react";
import Vider from "../../Assets/img/trailer.mp4"
import NavUser from "../../Component/NavbarUser";
import {Row, Col, Button} from "react-bootstrap"
import  { API } from '../../Config/Api'
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function MovieDetail() {

    let { id } = useParams()
    
    let { data : tv } = useQuery("tvCache", async () => {
        const response = await API.get(`/tv/${id}`)
        return response.data.data
    })

    console.log("datafilm", tv)

    return (
        <div>
            <NavUser />
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
                                    <img src={tv?.image} alt="cover" style={{height:"300px"}} />
                                </Col>
                                <Col>
                                    <div>
                                        <h3>{tv?.title}</h3>
                                        <i>{tv?.year}</i><Button variant="outline-light" className="ms-2 mb-2">Movies</Button>
                                        <p>{tv?.description}</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col>
                        <div>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}