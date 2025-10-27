import { useEffect, useState } from "react";
import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setName(parsed.name);
      setBio(parsed.bio || "");
      setPreview(parsed.avatarUrl || "");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (password) formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    const res = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (data.id) {
      localStorage.setItem("user", JSON.stringify(data));
      alert("Perfil atualizado com sucesso!");
      setUser(data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Meu Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="avatar-container">
            <img
              src={
                preview ||
                "https://i.ibb.co/5GzXkwq/default-avatar.png"
              }
              alt="Avatar"
              className="profile-avatar"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setAvatar(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </div>

          <input
            type="text"
            value={name}
            placeholder="Seu nome"
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Escreva sua bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          <input
            type="password"
            placeholder="Nova senha (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="save-btn">
            Salvar Alterações
          </button>
        </form>

        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default Profile;
