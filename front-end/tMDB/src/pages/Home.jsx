import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "./MovieGrid.css";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async () => {
    try {
      const res = await fetch(`${API_URL}/movies/top-rated`);
      const data = await res.json();
      setTopMovies(data.results || []); 
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    }
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
