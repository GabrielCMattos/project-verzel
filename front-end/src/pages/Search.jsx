import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./MovieGrid.css";

const API_URL = import.meta.env.VITE_API_URL;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async () => {
    try {
      const res = await fetch(`${API_URL}/movies/search?q=${query}`);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  useEffect(() => {
    if (query) getSearchedMovies();
  }, [query]);

  return (
    <div className="home-container">
      <h2 className="home-title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>

      <div className="home-grid">
        {movies.length === 0 && (
          <p className="home-loading">Carregando...</p>
        )}

        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} cardType="default" />
          ))}
      </div>
    </div>
  );
};

export default Search;
