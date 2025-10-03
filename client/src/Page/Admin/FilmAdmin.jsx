import React from "react";
import NavAdmin from "../../Component/NavbarAdmin";
import {Row, Col, Dropdown, Button} from "react-bootstrap"
import CardFilm from "../../Component/Card/CardFilmAdmin";
import CardTV from "../../Component/Card/CardTVAdmin"

import { useNavigate } from "react-router-dom";
import { API } from "../../Config/Api";
import { useQuery } from "react-query";



export default function FilmAdmin() {
 
    let navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/addfilmadmin')
    }

    let {data : movies } = useQuery("/moviesCache", async () => {
        const response = await API.get ("/movies")
        return response.data.data
    })

    let { data : tvs } = useQuery("tvsCache", async () => {
        const response = await API.get ("/tvs")
        return response.data.data
    } ) 

    return (
        <div style={{ backgroundColor:"black"}}>
            <NavAdmin />
            <div className="p-5">
                <div>
                    <Row>
                        <Col xs={2} style={{width:"9%"}} className="text-white fs-4 fw-bold">List Film</Col>
                        <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="black" id="dropdown-basic" className="border text-white">
                                        Category
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{backgroundColor:"gainsboro"}} className="fs-6">
                                        <Dropdown.Item href="#/action-1" className="fw-bold">Movie</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2" className="fw-bold">TV Series</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>                 
                        </Col>
                        <Col xs={2}>
                            <div>
                                <Button onClick={handleNavigate}  className="ps-5 pe-5 fw-bold" style={{backgroundColor:'red', border:'none'}}>Add film</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="p-5 bg-black text-white">
                <div className="mb-5">
                    <h2>TV Series</h2>
                    {tvs?.length !== 0 ? ( 
                        <div className="p-5 d-flex flex-wrap justify-content-around">
                        {tvs?.map((item,index) => (
                            <CardTV item={item} key={index} />
                        ))}
                        </div>
                    ) : (
                        <div>
                            Movies not Found
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <h2>Movies</h2>
                    {movies?.length !== 0 ? ( 
                        <div className="p-5 d-flex flex-wrap justify-content-around">
                        {movies?.map((item,index) => (
                            <CardFilm item={item} key={index} />
                        ))}
                        </div>
                    ) : (
                        <div>
                            Movies not Found
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
    )
}