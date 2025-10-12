import React, { useEffect } from "react";
import Navbar from "../../Component/NavbarUser";
import { Button } from "react-bootstrap";
import CardFilm from "../../Component/Card/CardFilms";
import CardTV from "../../Component/Card/CardTV";
import { Link } from 'react-router-dom';
import Gambar111 from "../../Assets/img/Gambar111.jpg";
import useMovieStore from "../../Store/movieStore"; // Import the movie store
import useSeriesStore from "../../Store/seriesStore"; // Import the series store

export default function User() {
    const { movies, fetchMovies } = useMovieStore();
    const { series, fetchSeries } = useSeriesStore();

    useEffect(() => {
        fetchMovies();
        fetchSeries();
    }, [fetchMovies, fetchSeries]);

    // For the top container, we can use the first series from the fetched list, or handle if no series are available
    const featuredTv = series.length > 0 ? series[0] : null;

    return (
        <div>
            <Navbar />
            <div className="topContainer" style={{ backgroundImage: `url(${Gambar111})`}}>
                    <div className="descriptionTopContainer">
                        <h1>{featuredTv?.title}</h1>
                        <div>
                            <p>
                                {featuredTv?.description}
                            </p>
                           <b>{featuredTv?.year}</b><Button variant="outline-light" className="ms-3">TV SERIES</Button>
                           <div className="mt-3">
                            <Button variant="danger" className="ps-3 pe-3" as={Link} to={`/detailtv/${featuredTv?.id}`}>WATCH NOW !</Button>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="p-5 bg-black text-white">
                <div className="mb-5">
                    <h2>TV Series</h2>
                    {series?.length !== 0 ? (
                        <div className="p-5 d-flex flex-wrap justify-content-around">
                        {series?.map((item,index) => (
                            <CardTV item={item} key={index} />
                        ))}
                        </div>
                    ) : (
                        <div>
                            TV Series not Found
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
    );
}
