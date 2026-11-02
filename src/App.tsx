import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import ChampionsPage from "./pages/ChampionsPage";
import ChampionDetailPage from "./pages/ChampionDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ItemsPage from "./pages/ItemsPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <main className="app">
        <Routes>
          <Route path="/" element={<ChampionsPage />} />
          <Route path="/champions/:id" element={<ChampionDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
