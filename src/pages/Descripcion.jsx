
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Descripcion = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.swapi.tech/api/${type}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data.result.properties);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching item:", error);
        setLoading(false);
      });
  }, [type, id]);

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : item ? (
        <div className="card">
           <img src="..." className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            {type === "people" && (
              <>
                <p className="card-text">Height: {item.height} cm</p>
                <p className="card-text">Mass: {item.mass} kg</p>
                <p className="card-text">Hair Color: {item.hair_color}</p>
                <p className="card-text">Eye Color: {item.eye_color}</p>
              </>
            )}
            {type === "vehicles" && (
              <>
                <p className="card-text">Model: {item.model}</p>
                <p className="card-text">Manufacturer: {item.manufacturer}</p>
                <p className="card-text">Crew: {item.crew}</p>
              </>
            )}
            {type === "planets" && (
              <>
                <p className="card-text">Diameter: {item.diameter} km</p>
                <p className="card-text">Climate: {item.climate}</p>
                <p className="card-text">Population: {item.population}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <p className="text-danger">Error loading item</p>
      )}
    </div>
  );
};