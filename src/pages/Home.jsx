
import { useState, useEffect, useContext } from "react";
import  {FavoritesContext}  from "./FavoritesContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://www.swapi.tech/api/people").then((res) => res.json()),
      fetch("https://www.swapi.tech/api/vehicles").then((res) => res.json()),
      fetch("https://www.swapi.tech/api/planets").then((res) => res.json()),
    ])
      .then(([peopleData, vehiclesData, planetsData]) => {
        setPeople(peopleData.results);
        setVehicles(vehiclesData.results);
        setPlanets(planetsData.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const isFavorite = (uid, type) => {
    return favorites.some((fav) => fav.uid === uid && fav.type === type);
  };

  const renderList = (items, type, title) => (
    <div className="mb-5">
      <h2 className="mb-3">{title}</h2>
      <div className="row">
        {items.map((item) => (
          <div key={`${type}-${item.uid}`} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex gap-2">
                  <Link to={`/${type}/${item.uid}`} className="btn btn-outline-primary">
                    Learn more!
                  </Link>
                  <button
                    className={`btn btn-outline-${
                      isFavorite(item.uid, type) ? "danger" : "warning"
                    }`}
                    onClick={() =>
                      isFavorite(item.uid, type)
                        ? removeFavorite(item.uid, type)
                        : addFavorite({ uid: item.uid, name: item.name, type })
                    }
                  >
                    {isFavorite(item.uid, type) ? "Remove" : "❤️"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {renderList(people, "people", "Characters")}
          {renderList(vehicles, "vehicles", "Vehicles")}
          {renderList(planets, "planets", "Planets")}
        </>
      )}
    </div>
  );
};