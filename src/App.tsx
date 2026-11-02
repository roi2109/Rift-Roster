import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useFavorites } from "./hooks/useFavorites";
import ChampionsPage from "./pages/ChampionsPage";
import ChampionDetailPage from "./pages/ChampionDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ItemsPage from "./pages/ItemsPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  // Favorites are used by three pages, so they live in their closest common parent and go down as props.
  const favorites = useFavorites();

  return (
    <>
      <NavBar />
      <main className="app">
        <Routes>
          <Route path="/" element={<ChampionsPage favorites={favorites} />} />
          <Route path="/champions/:id" element={<ChampionDetailPage favorites={favorites} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
