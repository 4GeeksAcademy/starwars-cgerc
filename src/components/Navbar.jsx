// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../pages/FavoritesContext"; 

export const Navbar = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <nav className="navbar navbar-light bg-black">
      <div className="container d-flex justify-content-between align-items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png"
          className="card-img-top"
          alt="logo-starwars"
          style={{ width: "100px" }}
        />
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites <span className="badge bg-secondary">{favorites.length}</span>
          </button>
          <ul className="dropdown-menu">
            {favorites.length > 0 ? (
              favorites.map((favorite) => (
                <li
                  key={`${favorite.type}-${favorite.uid}`}
                  className="d-flex align-items-center justify-content-between px-3"
                >
                  <Link
                    className="dropdown-item"
                    to={`/${favorite.type}/${favorite.uid}`}
                  >
                    {favorite.name}
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => removeFavorite(favorite.uid, favorite.type)}
                  >
                    &times;
                  </button>
                </li>
              ))
            ) : (
              <li>
                <span className="dropdown-item text-muted">(empty)</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;