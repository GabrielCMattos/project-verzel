import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="profile-container">
      <h2>Perfil</h2>
      <img
        src={user.avatarUrl || "https://via.placeholder.com/100"}
        alt="avatar"
      />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>{user.bio || "Sem biografia ainda"}</p>
    </div>
  );
};

export default Profile;
