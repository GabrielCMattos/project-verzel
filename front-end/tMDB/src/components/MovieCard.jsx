import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./MovieCard.css";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true, cardType = "default" }) => {
  const rootClass = `card ${cardType === "carousel" ? "card-carousel" : "card-default"}`;

  return (
    <div className={rootClass}>
      <div className="card-poster">
        <img
          src={movie.poster_path ? imageUrl + movie.poster_path : "/no-image.png"}
          alt={movie.title}
          loading="lazy"
        />
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
