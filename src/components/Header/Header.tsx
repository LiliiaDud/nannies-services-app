import css from './Header.module.css';
import MobileMenu from '../MobileMenu/MobileMenu';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../ModalContext/UseModal';
import { useState } from 'react';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';

interface HeaderProps {
  isAuth: boolean;
  onLogOut: () => void;
  userName: string;
  setIsAuth: (value: boolean) => void;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

export default function Header({
  isAuth,
  onLogOut,
  userName,
  setIsAuth,
  setUserName,
}: HeaderProps) {
  const { openModal } = useModal();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openLogin = () => openModal(<Login setIsAuth={setIsAuth} setUserName={setUserName} />);

  const openRegistration = () =>
    openModal(<Registration setIsAuth={setIsAuth} setUserName={setUserName} />);

  const isNannies = location.pathname === '/nannies';
  const isFavorites = location.pathname === '/favorites';

  const innerChange = location.pathname === '/nannies' || location.pathname === '/favorites';

  const isHome = location.pathname === '/';

  return (
    <div className={innerChange ? css.header_container_inner : css.header_container}>
      <div className={innerChange ? css.headerInNannies : css.header}>
        <div className={innerChange ? css.inner_logo : css.logo}>
          <Link to="/" aria-label="Home" className={css.logo_text}>
            Nanny.Services
          </Link>
        </div>
        <div className={`${css.menu} ${isHome ? css.menu_home : ''}`}>
          <nav className={css.nav}>
            <ul className={css.navigation}>
              <li>
                <Link className={css.nav_text} to="/">
                  Home
                </Link>
              </li>
              <li className={`${css.nav_item} ${isNannies ? css.active : ''}`}>
                <Link className={css.nav_text} to="/nannies">
                  Nannies
                </Link>
              </li>
              {isAuth && (
                <li className={`${css.nav_item} ${isFavorites ? css.active : ''}`}>
                  <Link className={css.nav_text} to="/favorites">
                    Favorites
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className={css.registration_form}>
          <ul className={css.registration}>
            {isAuth ? (
              <>
                <li className={css.user_info}>
                  <button className={css.user_btn}>
                    <svg className={css.icon_user} width={24} height={24}>
                      <use href="/sprite.svg#icon-user" />
                    </svg>
                  </button>
                  <p className={css.user_text}>{userName}</p>
                </li>
                <li className={css.user_info}>
                  <button
                    className={innerChange ? css.btn_inNannies : css.btn_logOut}
                    type="button"
                    onClick={onLogOut}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className={css.btn_log} type="button" onClick={openLogin}>
                    Log In
                  </button>
                </li>
                <li>
                  <button
                    className={innerChange ? css.btn_inNannies : css.btn_registration}
                    type="button"
                    onClick={openRegistration}
                  >
                    Registration
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        <button className={css.burger_btn} type="button" onClick={() => setMobileMenuOpen(true)}>
          <svg className={css.burger_icon} width="32" height="32">
            <use href="/sprite.svg#icon-burger" data-menu-open></use>
          </svg>
        </button>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          isAuth={isAuth}
          userName={userName}
          onLogOut={onLogOut}
          onLogin={openLogin}
          onRegistration={openRegistration}
          isNannies={isNannies}
          isFavorites={isFavorites}
        />
      </div>
    </div>
  );
}
