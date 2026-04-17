import { Routes, Route, useLocation } from 'react-router-dom';

import css from './App.module.css';
import { useModal } from "../components/ModalContext/UseModal";
import { useState } from "react";

import Header from "../components/Header/Header";
import Home from "../pages/Home/Home.tsx";
import Nannies from "../pages/Nannies/Nannies";
import Favorites from "../pages/Favorites/Favorites";

import Login from "../components/Login/Login";
import Registration from "../components/Registration/Registration";
import Modal from "../components/Modal/Modal";

  function App() {
    const { closeModal, isModalOpen } = useModal();
    const [modalType, setModalType] = useState<
      "login" | "register" | "appointment" | null
    >(null);

    const location = useLocation();
    const page = location.pathname;

    return (
      <div className={css.app_container}>
        <Header setModalType={setModalType} page={page} />
        {isModalOpen && (
          <Modal onClose={closeModal}>
            {modalType === "login" && <Login />}
            {modalType === "register" && <Registration />}
          </Modal>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nannies" element={<Nannies />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    )
  }

export default App;
