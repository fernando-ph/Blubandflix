import React, {useState, useEffect, useCallback} from "react"; // Import useEffect and useCallback
import NavAdmin from "../../Component/NavbarAdmin";
import {Row, Col, Button, Modal} from "react-bootstrap"
import { useParams } from "react-router-dom";
import useMovieStore from "../../Store/movieStore"; // Import useMovieStore


const getVideoEmbedUrl = (url) => {
    if (!url) return null;

    // 🎥 Google Drive
    if (url.includes("drive.google.com")) {
        const match =
            url.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
            url.match(/id=([a-zA-Z0-9_-]+)/);
        if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
    }

    // ▶️ YouTube (berbagai format)
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const match =
            url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/) ||
            url.match(/youtu\.be\/([0-9A-Za-z_-]{11})/);
        if (match) return `https://www.youtube.com/embed/${match[1]}`;
    }

    // 📦 File video langsung
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
        return url;
    }

    return null;
};

const MoviePlayer = ({ movie }) => {
    const embedUrl = getVideoEmbedUrl(movie.link);

    if (!embedUrl) {
        return <p>❌ Link tidak valid atau format belum didukung.</p>;
    }

    // Jika file lokal (mp4/webm/ogg)
    if (embedUrl.match(/\.(mp4|webm|ogg)$/i)) {
        return (
            <video
                width="100%"
                height="500"
                controls
                preload="metadata"
                style={{ backgroundColor: "#000" }}
            >
                <source src={embedUrl} type="video/mp4" />
                Browser kamu tidak mendukung tag video.
            </video>
        );
    }

    // Jika YouTube atau Google Drive (pakai iframe)
    return (
        <iframe
            width="100%"
            height="500"
            src={embedUrl}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
};

export default function DetailFilmAdmin() {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow (true)

    let {id} = useParams()
    const { movies, fetchMovies } = useMovieStore();
    const movieadmin = movies.find(movie => movie.id === parseInt(id));

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]); // Removed 'id' from dependency array as it's not used in fetchMovies

    return (
        
        <div>
            <NavAdmin />
        <div style={{backgroundColor:"black"}}>
                {movieadmin?.link && <MoviePlayer movie={movieadmin} />}
            </div>
            <div style={{backgroundColor:"black", padding:"20px", color:"Gray", fontWeight:"bold"}}>
                <hr />
                <Row>
                    <Col>
                        <div>
                            <Row className="ps-5">
                                <Col xs={2}>
                                    <img src={movieadmin?.image} alt="cover" style={{height:"10%"}} />
                                </Col>
                                <Col>
                                    <div>
                                        <h3>{movieadmin?.title}</h3>
                                        <i>{movieadmin?.year}</i><Button variant="outline-light" className="ms-2 mb-2">Movies</Button>
                                        <p>{movieadmin?.description} </p>
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
