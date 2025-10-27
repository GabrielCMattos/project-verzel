import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./MovieCard.css";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true, cardType = "default" }) => {
  const isCarousel = cardType === "carousel";

  return (
    <div className={`card ${isCarousel ? "card-carousel" : "card-default"}`}>
      <div className="card-poster">
        <img
          src={movie.poster_path ? imageUrl + movie.poster_path : "/no-image.jpg"}
          alt={movie.title}
        />
        {isCarousel && (
          <div className="card-overlay">
            <h2>{movie.title}</h2>
            <p>
              <FaStar /> {movie.vote_average.toFixed(1)}
            </p>
            {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
          </div>
        )}
      </div>
      {!isCarousel && (
        <div className="card-info">
          <h2>{movie.title}</h2>
          <p>
            <FaStar /> {movie.vote_average.toFixed(1)}
          </p>
          {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
