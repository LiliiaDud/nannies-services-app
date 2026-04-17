import css from "./Header.module.css";
import { Link } from "react-router-dom";
import { useModal } from "../ModalContext/UseModal";

interface HeaderProps {
  setModalType: (type: "login" | "register") => void;
  page: string;
}

export default function Header({ setModalType, page }: HeaderProps) {
  const { openModal } = useModal();

  const openLogin = () => {
    setModalType("login");
    openModal();
  };

  const openRegistration = () => {
    setModalType("register");
    openModal();
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: page === "/nannies" ? "red" : "",
  };

  return (
    <div className={css.header} style={headerStyle}>
      <div className={css.logo}>
        <Link to="/" aria-label="Home" className={css.logo_text}>
          Nanny.Services
        </Link>
      </div>
      <div className={css.menu}>
        <nav className={css.nav}>
          <ul className={css.navigation}>
            <li>
              <Link className={css.nav_text} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={css.nav_text} to="/nannies">
                Nannies
              </Link>
            </li>
          </ul>
        </nav>
        <div className={css.registration}>
          <button className={css.btn_log} type="button" onClick={openLogin}>
            Log In
          </button>
          <button
            className={css.btn_registration}
            type="button"
            onClick={openRegistration}
          >
            Registration
          </button>
        </div>
      </div>
    </div>
  );
}