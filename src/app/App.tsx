import { Routes, Route } from 'react-router-dom';

import css from './App.module.css';
import Home from "../pages/Home/Home.tsx";
import Nannies from "../pages/Nannies/Nannies.tsx";
import Favorites from "../pages/Favorites/Favorites.tsx";

  function App() {
    return (
      <div className={css.app_container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nannies" element={<Nannies />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    )
  }

export default App;
