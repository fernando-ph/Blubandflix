import React, { useEffect } from "react";
import Navbar from "../../Component/NavbarUser";
import CardFilm from "../../Component/Card/CardFilms";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useMovieStore from "../../Store/movieStore"; // Import the movie store

export default function Movies() {
    const { movies, fetchMovies } = useMovieStore();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    // For the top container, we can use the first movie from the fetched list, or handle if no movies are available
    const featuredMovie = movies.length > 0 ? movies[0] : null;

    return (
        <>
           <div>
            <Navbar />
            <div className="topContainer" style={{ backgroundImage: `url(${featuredMovie?.image})`}}>
                    <div className="descriptionTopContainer">
                        <h1>{featuredMovie?.title}</h1>
                        <div>
                            <p>
                                {featuredMovie?.description}
                            </p>
                           <b>{featuredMovie?.year}</b><Button variant="outline-light" className="ms-3">MOVIE</Button>
                           <div className="mt-3">
                            <Button variant="danger" className="ps-3 pe-3" as={Link} to={`/detailmovie/${featuredMovie?.id}`}>WATCH NOW !</Button>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="p-5 bg-black text-white">
                <div className="mb-5">
                    <h2>Movie</h2>
                    {movies?.length !== 0 ? (
                        <div className="row p-5">
                        {movies?.map((item,index) => (
                            <div className="col-6 col-md-4 col-lg-3 mb-4" key={index}>
                                <CardFilm item={item} />
                            </div>
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
    );
}
