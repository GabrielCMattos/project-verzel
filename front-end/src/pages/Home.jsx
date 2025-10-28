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
        const [topRes, recentRes] = await Promise.all([
          fetch(`${API_URL}/movies/top-rated`),
          fetch(`${API_URL}/movies/now-playing`),
        ]);

        const [topData, recentData] = await Promise.all([
          topRes.json(),
          recentRes.json(),
        ]);

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
    <div className="home-container">
      <h2 className="home-title">Melhores Filmes:</h2>

      {topMovies.length === 0 ? (
        <p className="home-loading">Carregando...</p>
      ) : (
        <Slider {...sliderSettings} className="home-slider">
          {topMovies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} cardType="carousel" />
          ))}
        </Slider>
      )}

      <h2 className="home-title">Mais Recentes:</h2>
      <div className="home-grid">
        {recentMovies.length === 0 ? (
          <p className="home-loading">Carregando...</p>
        ) : (
          recentMovies.slice(0, 12).map((movie) => (
            <MovieCard key={movie.id} movie={movie} cardType="default" />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
