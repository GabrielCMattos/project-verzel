import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";
import "./Navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
      else setUser(null);
    };

    loadUser();
    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav id="navbar">
      <h2>
        <Link to="/">
          <BiCameraMovie /> CasaFilmes
        </Link>
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque um filme..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>

      {user ? (
        <div className="user-menu" ref={menuRef}>
          <img
            src={
              user.avatarUrl
                ? user.avatarUrl.startsWith("http")
                  ? user.avatarUrl
                  : `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/${user.avatarUrl.replace(/^\//, "")}`
                : "/default-avatar.png"
            }
            alt="avatar"
            className="user-avatar"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate(`/profile/${user.id}`)}>
                Meu perfil
              </button>
              <button onClick={handleLogout}>Sair</button>
            </div>
          )}
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="btn-login">
            Entrar
          </Link>
          <Link to="/register" className="btn-register">
            Cadastrar
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
