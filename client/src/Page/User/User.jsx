import React from "react";
import Navbar from "../../Component/NavbarUser"
import { Button } from "react-bootstrap";
import CardFilm from "../../Component/Card/CardFilms";
import CardTV from "../../Component/Card/CardTV"
import { API } from "../../Config/Api"
import { useQuery } from "react-query";
import {Link} from 'react-router-dom'
import Gambar111 from "../../Assets/img/Gambar111.jpg"


export default function User() {

    

    let { data : tv } = useQuery("tvCache", async () => {
        const response = await API.get (`/tv/3`)
        return response.data.data
    })


    let {data : movies } = useQuery("/moviesCache", async () => {
        const response = await API.get ("/movies")
        return response.data.data
    })

    let { data : tvs } = useQuery("tvsCache", async () => {
        const response = await API.get ("/tvs")
        return response.data.data
    } ) 


    return (
        <div>
            <Navbar />
            <div className="topContainer" style={{ backgroundImage: `url(${Gambar111})`}}>
                    <div className="descriptionTopContainer">
                        <h1>{tv?.title}</h1>
                        <div>
                            <p>
                                {tv?.description}
                            </p>
                           <b>{tv?.year}</b><Button variant="outline-light" className="ms-3">TV SERIES</Button>
                           <div className="mt-3">
                            <Button variant="danger" className="ps-3 pe-3" as={Link} to='/detailtv/3'>WATCH NOW !</Button>
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
    )
}
