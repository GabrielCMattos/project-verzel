import { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) return <p className="loading">Carregando...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={user.avatarUrl || "https://i.ibb.co/5GzXkwq/default-avatar.png"}
          alt="Avatar"
          className="profile-avatar"
        />
        <h2>{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-bio">{user.bio || "Sem biografia ainda."}</p>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Profile;
