import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(
    user?.avatarUrl
      ? user.avatarUrl.startsWith("http")
        ? user.avatarUrl
        : `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/${user.avatarUrl.replace(/^\//, "")}`
      : "/default-avatar.png"
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (password) formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/update`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });


      if (!res.ok) {
        let msg = "Erro ao atualizar perfil";
        try {
          const err = await res.json();
          if (err?.message) msg = err.message;
        } catch { }
        throw new Error(msg);
      }

      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("storage"));
      setMessage("Perfil atualizado com sucesso!");
      setTimeout(() => navigate(`/profile/${data.id}`), 1200);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="edit-profile-page">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h2>Editar Perfil</h2>

        <div className="avatar-section">
          {preview ? (
            <img src={preview} alt="Preview" className="avatar-preview" />
          ) : (
            <div className="avatar-placeholder">Sem foto</div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <label>Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />

        <label>Biografia</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows="3" />

        <label>Nova senha</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Deixe em branco para não alterar"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar alterações"}
        </button>

        {message && <p className="feedback">{message}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
