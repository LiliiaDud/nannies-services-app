import css from "./mobileMenu.module.css";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuth: boolean;
  userName: string;
  onLogin: () => void;
  onRegistration: () => void;
  onLogOut: () => void;
  isFavorites: boolean;
  isNannies: boolean;
}

export default function MobileMenu({
                                     isOpen,
                                     onClose,
                                     isAuth,
                                     userName,
                                     onLogin,
                                     onRegistration,
                                     onLogOut,
                                     isFavorites,
                                     isNannies,
                                   }: MobileMenuProps) {
  if (!isOpen) return null;
  return (
    <div className={css.mobile_menu}>
      <div className={css.mobile_top}>
        <Link to="/" className={css.mobile_logo_text} onClick={onClose}>
          Nanny.Services
        </Link>

        <button className={css.mobile_btn_close} onClick={onClose}>
          <svg width={19} height={19} className={css.mobile_close_icon}>
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </div>

      <nav className={css.mobile_nav}>
        <ul>
          <li>
            <Link className={css.mobile_link} to="/" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <Link className={css.mobile_link} to="/nannies" onClick={onClose}>
              Nannies
            </Link>
            {isNannies && (
              <svg className={css.mobile_icon_point} width={8} height={8}>
                <use href="/sprite.svg#icon-point" />
              </svg>
            )}
          </li>
          {isAuth && (
            <li>
              <Link
                className={css.mobile_link}
                to="/favorites"
                onClick={onClose}
              >
                Favorites
              </Link>
              {isFavorites && (
                <svg className={css.mobile_icon_point} width={8} height={8}>
                  <use href="/sprite.svg#icon-point" />
                </svg>
              )}
            </li>
          )}
        </ul>
      </nav>

      <div className={css.mobile_actions}>
        {isAuth ? (
          <>
            <div className={css.mobile_user}>
              <button className={css.mobile_user_btn}>
                <svg className={css.mobile_icon_user} width={24} height={24}>
                  <use href="/sprite.svg#icon-user" />
                </svg>
              </button>
              <p className={css.mobile_user_text}>{userName}</p>
            </div>

            <button
              className={css.mobile_btn_logOut}
              onClick={() => {
                onLogOut();
                onClose();
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              className={css.mobile_btn_log}
              onClick={() => {
                onLogin();
                onClose();
              }}
            >
              Log In
            </button>
            <button
              className={css.mobile_btn_registration}
              onClick={() => {
                onRegistration();
                onClose();
              }}
            >
              Registration
            </button>
          </>
        )}
      </div>
    </div>
  );
}