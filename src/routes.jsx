// src/routes.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./pages/FavoritesContext"; // Corrección de la ruta
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Descripcion } from "./pages/Descripcion";

export const AppRoutes = () => {
  return (
    <FavoritesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:type/:id" element={<Descripcion />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default AppRoutes;