import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_URL = import.meta.env.VITE_API_URL;

import "./MovieGrid.css";

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async () => {
    const res = await fetch(`${API_URL}/movies/search?query=top_rated`);
    const data = await res.json();
    setTopMovies(data.results);
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
