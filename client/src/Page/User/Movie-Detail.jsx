import React, { useEffect, useCallback } from "react"; // Import useEffect and useCallback
import NavUser from "../../Component/NavbarUser";
import {Row, Col, Button} from "react-bootstrap"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MoviePlayer from "../../Component/VideoPlayer/MoviePlayer"; // Import MoviePlayer
import useMovieStore from "../../Store/movieStore"; // Import useMovieStore

export default function MovieDetail() {

    let { id } = useParams()
    const { movies, fetchMovies } = useMovieStore();
    const movie = movies.find(movie => movie.id === parseInt(id));

    const memoizedFetchMovies = useCallback(() => {
        fetchMovies();
    }, [fetchMovies]);

    useEffect(() => {
        memoizedFetchMovies();
    }, [memoizedFetchMovies, id]);

    if (!movie) return <p>Loading movie details or movie not found.</p>;

    return (
        <div>
            <NavUser />
            <div style={{backgroundColor:"black"}}>
                {movie?.link && <MoviePlayer movie={movie} />}
            </div>
            <div style={{backgroundColor:"black", padding:"20px", color:"Gray", fontWeight:"bold"}}>
                <hr />
                <Row>
                    <Col>
                        <div>
                            <Row className="ps-5">
                                <Col xs={2}>
                                    <img src={movie?.image} alt="cover" style={{height:"10%"}} />
                                </Col>
                                <Col>
                                    <div>
                                        <h3>{movie?.title}</h3>
                                        <i>{movie?.year}</i><Button variant="outline-light" className="ms-2 mb-2" as={Link} to='/movie'>Movies</Button>
                                        <p>{movie?.description} </p>
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
