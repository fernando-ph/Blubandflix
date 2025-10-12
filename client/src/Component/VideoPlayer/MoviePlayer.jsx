import React from "react";

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
    const embedUrl = getVideoEmbedUrl(movie?.link);

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

export default MoviePlayer;
