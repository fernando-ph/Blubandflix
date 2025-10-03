import React from "react";
import Navbar from "../../Component/NavbarUser"
import CardFilm from "../../Component/Card/CardFilms";
import { Button } from "react-bootstrap";
import { API } from "../../Config/Api"
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function MoviePage() {

    let { data : movie } = useQuery("movieCache", async () => {
        const response = await API.get (`/movie/3`)
        return response.data.data
    })

    console.log("data movie :", movie)

    let {data : movies } = useQuery("/moviesCache", async () => {
        const response = await API.get ("/movies")
        return response.data.data
    })

    return (
        <>
           <div>
            <Navbar />
            <div className="topContainer" style={{ backgroundImage: `url(${movie?.image})`}}>
                    <div className="descriptionTopContainer">
                        <h1>{movie?.title}</h1>
                        <div>
                            <p>
                                {movie?.description}
                            </p>
                           <b>{movie?.year}</b><Button variant="outline-light" className="ms-3">MOVIE</Button>
                           <div className="mt-3">
                            <Button variant="danger" className="ps-3 pe-3" as={Link} to='/detailmovie/3'>WATCH NOW !</Button>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="p-5 bg-black text-white">
                <div className="mb-5">
                    <h2>Movie</h2>
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
        </>
    )
}