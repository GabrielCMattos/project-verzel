import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  // Esconde a navbar nas páginas de login e registro
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Páginas principais */}
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/search" element={<Search />} />

        {/* Autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Perfil do usuário */}
        <Route path="/profile/:id" element={<Profile />} /> 
        <Route path="/edit-profile" element={<EditProfile />} /> 
      </Routes>
    </>
  );
}

export default App;
