import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await apiFetch(`/users/${id}`);
      setUser(data);
      const favs = await apiFetch(`/favorites/${id}`);
      setFavorites(favs);
    };
    fetchProfile();
  }, [id]);

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={user.avatarUrl ? `${import.meta.env.VITE_API_URL}/${user.avatarUrl}` : "/default-avatar.png"}
          alt="avatar"
          className="profile-avatar"
        />
        <h2>{user.name}</h2>
        <p>{user.bio || "Sem biografia ainda."}</p>

        {loggedUser?.id === user.id && (
          <button className="edit-btn" onClick={() => navigate("/edit-profile")}>
            Editar perfil
          </button>
        )}
      </div>

      <div className="favorites-section">
        <h3>Filmes favoritos</h3>
        <div className="favorites-grid">
          {favorites.length === 0 ? (
            <p>Este usuário ainda não favoritou nenhum filme.</p>
          ) : (
            favorites.map((fav) => (
              <div key={fav.id} className="fav-item">
                <img src={`https://image.tmdb.org/t/p/w200${fav.poster}`} alt={fav.title} />
                <p>{fav.title}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
