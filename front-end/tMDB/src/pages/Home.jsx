import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieGrid.css";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const topRes = await fetch(`${API_URL}/movies/top-rated`);
        const recentRes = await fetch(`${API_URL}/movies/now-playing`);
        const topData = await topRes.json();
        const recentData = await recentRes.json();

        setTopMovies(topData.results || []);
        setRecentMovies(recentData.results || []);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    };

    fetchMovies();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 400, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes:</h2>

      {topMovies.length === 0 ? (
        <p className="loading-text">Carregando...</p>
      ) : (
        <Slider {...sliderSettings} className="movie-slider">
          {topMovies.slice(0, 10).map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </Slider>
      )}

      <h2 className="title recent-title">Mais Recentes:</h2>
      <div className="movies-container">
        {recentMovies.length === 0 ? (
          <p className="loading-text">Carregando...</p>
        ) : (
          recentMovies.slice(0, 12).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
