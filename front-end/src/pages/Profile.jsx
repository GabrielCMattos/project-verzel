import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiFetch(`/users/${id}`);
        setUser(data);
        const favs = await apiFetch(`/favorites/${id}`);
        setFavorites(favs);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    };
    fetchProfile();
  }, [id]);

  if (!user) return <p>Carregando...</p>;

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
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
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={
            user.avatarUrl
              ? user.avatarUrl.startsWith("http")
                ? user.avatarUrl
                : `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/${user.avatarUrl.replace(/^\//, "")}`
              : "/default-avatar.png"
          }
          alt="avatar"
          className="profile-avatar"
          onError={(e) => (e.target.src = "/default-avatar.png")}
        />

        <h2>{user.name}</h2>
        <p>{user.bio || "Sem biografia ainda."}</p>

        {loggedUser?.id === user.id && (
          <div className="profile-buttons">
            <button className="edit-btn" onClick={() => navigate("/edit-profile")}>
              Editar perfil
            </button>

            <button
              className="share-btn"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/profile/${user.id}`);
                alert("🔗 Link do perfil copiado!");
              }}
            >
              Compartilhar
            </button>
          </div>
        )}
      </div>

      <div className="favorites-section">
        <h3>Filmes Favoritos</h3>

        {favorites.length === 0 ? (
          <p>Este usuário ainda não favoritou nenhum filme.</p>
        ) : favorites.length < 6 ? (
          // 👇 Exibição estática se tiver menos de 6 filmes
          <div className="favorites-grid">
            {favorites.map((fav) => (
              <div key={fav.id} className="fav-item">
                <div className="fav-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${fav.poster}`}
                    alt={fav.title}
                  />
                </div>
                <div className="fav-overlay">
                  <h2>{fav.title}</h2>
                  <a href={`/movie/${fav.movieId}`} className="btn">
                    Detalhes
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings} className="favorites-slider">
            {favorites.map((fav) => (
              <div key={fav.id} className="fav-item">
                <div className="fav-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${fav.poster}`}
                    alt={fav.title}
                  />
                </div>
                <div className="fav-overlay">
                  <h2>{fav.title}</h2>
                  <a href={`/movie/${fav.movieId}`} className="btn">
                    Detalhes
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>

    </div>
  );
};

export default Profile;
