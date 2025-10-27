import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from "react-icons/bs";
import MovieCard from "../components/MovieCard";
import "./Movie.css";

const API_URL = import.meta.env.VITE_API_URL;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    try {
      const res = await fetch(`${API_URL}/movies/movie/${id}`);
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    }
  };

  const formatCurrency = (number) =>
    number?.toLocaleString("en-US", { style: "currency", currency: "USD" });

  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <div className="details-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="details-tagline">{movie.tagline}</p>

          <div className="details-info">
            <h3><BsWallet2 /> Orçamento:</h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>

          <div className="details-info">
            <h3><BsGraphUp /> Faturamento:</h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>

          <div className="details-info">
            <h3><BsHourglassSplit /> Duração:</h3>
            <p>{movie.runtime} minutos</p>
          </div>

          <div className="details-info">
            <h3><BsFillFileEarmarkTextFill /> Sinopse:</h3>
            <p className="details-description">{movie.overview}</p>
          </div>

          <div className="details-extra">
            <p><strong>Gêneros:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
            <p><strong>Lançamento:</strong> {movie.release_date}</p>
            <p><strong>País:</strong> {movie.production_countries?.[0]?.name}</p>
            <p><strong>Estúdios:</strong> {movie.production_companies?.map(c => c.name).join(", ")}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
