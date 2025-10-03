import React from "react";
import Navbar from "../../Component/NavbarUser"
import CardTV from "../../Component/Card/CardTV";
import { Button } from "react-bootstrap";
import { API } from "../../Config/Api"
import { useQuery } from "react-query";
import {Link} from 'react-router-dom'

export default function MoviePage() {

    let { data : tv } = useQuery("tvCache", async () => {
        const response = await API.get (`/tv/6`)
        return response.data.data
    })

    console.log("data tv : ", tv)

    let { data : tvs } = useQuery("tvsCache", async () => {
        const response = await API.get ("/tvs")
        return response.data.data
    } ) 

    return (
        <>
           <div>
            <Navbar />
            <div className="topContainer" style={{ backgroundImage: `url(${tv?.image})`}}>
                    <div className="descriptionTopContainer">
                        <h1>{tv?.title}</h1>
                        <div>
                            <p>
                                {tv?.description}
                            </p>
                           <b>{tv?.year}</b><Button variant="outline-light" className="ms-3" as={Link} to='/tvseries'>TV SERIES</Button>
                           <div className="mt-3">
                            <Button variant="danger" className="ps-3 pe-3" as={Link} to='/detailtv/6'>WATCH NOW !</Button>
                            </div>
                        </div>
                    </div>
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
            </div>
        </div>
        </>
    )
}