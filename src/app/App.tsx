import { Routes, Route, useLocation } from 'react-router-dom';

import css from './App.module.css';
import { useModal } from '../components/ModalContext/UseModal';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { logout } from '../services/users';
import Header from '../components/Header/Header';
import Home from '../pages/Home/Home.tsx';
import Nannies from '../pages/Nannies/Nannies';
import Favorites from '../pages/Favorites/Favorites';

import Modal from '../components/Modal/Modal';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem('token'));
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [userName, setUserName] = useState<string>(localStorage.getItem('userName') || '');

  const location = useLocation();

  const { isModalOpen, modalContent, closeModal } = useModal();

  const toggleFavorite = (nannyName: string) => {
    setFavorites(prev => {
      let updated;
      if (prev.includes(nannyName)) updated = prev.filter(name => name !== nannyName);
      else updated = [...prev, nannyName];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const handleLogOut = () => {
    logout();
    localStorage.removeItem('favorites');
    setIsAuth(false);
    setUserName('');
  };

  return (
    <div className={`${css.app_container} ${location.pathname === '/' ? css.home : ''}`}>
      {isModalOpen && modalContent && <Modal onClose={closeModal}>{modalContent}</Modal>}
      <Header
        isAuth={isAuth}
        userName={userName}
        onLogOut={handleLogOut}
        setIsAuth={setIsAuth}
        setUserName={setUserName}
      />

      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/nannies"
          element={
            <Nannies favorites={favorites} toggleFavorite={toggleFavorite} isAuth={isAuth} />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites favorites={favorites} toggleFavorite={toggleFavorite} isAuth={isAuth} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
