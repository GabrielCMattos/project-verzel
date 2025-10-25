import { Link } from "react-router-dom";
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi";

const Navbar = () => {
    return (
        <nav id="nav">
            <h2>
                <Link to="/">Verzel Movies</Link>
            </h2>
            <form>
                <input type="text" placeholder="Busque um filme" />
                <button type="submit"></button>
            </form>
        </nav>
    )
}

export default Navbar;