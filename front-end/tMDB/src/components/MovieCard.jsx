import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { useState } from "react";
import "./MovieCard.css";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true, cardType = "default" }) => {
  const [favorite, setFavorite] = useState(false);
  const rootClass = `card ${cardType === "carousel" ? "card-carousel" : "card-default"}`;

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div className={rootClass}>
      <div className="card-poster">
        <img
          src={movie.poster_path ? imageUrl + movie.poster_path : "/no-image.png"}
          alt={movie.title}
          loading="lazy"
        />
        <button
          className={`fav-btn ${favorite ? "active" : ""}`}
          onClick={toggleFavorite}
          aria-label="Favoritar"
        >
          <FaHeart />
        </button>
      </div>

      <div className="card-overlay">
        <h2>{movie.title}</h2>
        <p><FaStar /> {movie.vote_average?.toFixed(1)}</p>
        {showLink && <Link to={`/movie/${movie.id}`} className="btn btn-details">Detalhes</Link>}
      </div>
    </div>
  );
};

export default MovieCard;
