import { Link } from 'react-router-dom';
import logo from '/logo.svg'
import line from '/line.svg'
import './header.css'
import { useSelector } from 'react-redux';
import ModalRegister from '../modal-register/modal-register';
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/hook';
import { logoutAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { clearDataRest } from '../../store/action';

export default function Header() {
  const authorizationStatus = useSelector((state) => state.authorizationStatus);
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('');
  const userStatusSingIn = 'singIn';
  const userStatusRegister = 'register';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = (evt) => {
    evt.preventDefault();
    navigate(AppRoute.Root)
    dispatch(logoutAction())
    dispatch(clearDataRest())
  }

  const handleLogoClick = () => {
    dispatch(clearDataRest())
  }

  const handleRegisterClick = () => {
    setModalStatus(userStatusRegister); // Set the status to 'register'
    setModalRegisterIsOpen(true);
  };

  const handleSingInClick = () => {
    setModalStatus(userStatusSingIn); // Set the status to 'register'
    setModalRegisterIsOpen(true);
  };

  return (
    <>
      {(authorizationStatus === 'UNKNOWN' || authorizationStatus === 'NO_AUTH') && (
        <section className="header">
          <Link className="logo" to="/" onClick={handleLogoClick}></Link>
          <button className="login__btn" onClick={handleSingInClick}></button>
          <ModalRegister
          isOpen={modalRegisterIsOpen}
          onClose={() => setModalRegisterIsOpen(false)}
          status={modalStatus}/>
          <input type="checkbox" id="bar" className="input-bar"/>
          <label htmlFor="bar" className="label-bar"><img className="img-bar"></img></label>
          <div className="nav-bar-container">
            <div className="nav-bar">
              <div className="bar-container"><img src={line}></img><button className="nav-bar__btn" onClick={handleRegisterClick}>Зарегистрироваться</button></div>
              <div className="bar-container"><img src={line}></img><button className="nav-bar__btn" onClick={handleSingInClick}>Войти</button></div>
            </div>
          </div>
        </section>
      )}
      {authorizationStatus === 'USER' && (
        <section className="header">
          <Link className="logo" to="/" onClick={handleLogoClick}></Link>
          <button className="logout__btn" onClick={handleClose}></button>
          <button className="profile__btn" onClick={() => navigate(AppRoute.Profile)}></button>
          <input type="checkbox" id="bar" className="input-bar"/>
          <label htmlFor="bar" className="label-bar"><img className="img-bar"></img></label>
          <div className="nav-bar-container">
            <div className="nav-bar">
              <div className="bar-container"><img src={line}></img><button className="nav-bar__btn" onClick={() => navigate(AppRoute.Profile)}>Личный кабинет</button></div>
              <div className="bar-container"><img src={line}></img><button className="nav-bar__btn" onClick={handleClose}>Выйти</button></div>
            </div>
          </div>
        </section>
      )}
      {authorizationStatus === 'ADMIN_REST' && (
        <section className="header">
          <Link className="logo" to="/restaurant"></Link>
          <button className="logout__btn" onClick={handleClose}></button>
          <button className="profile__btn" onClick={() => navigate(AppRoute.Profile)}></button>
          <input type="checkbox" id="bar" className="input-bar"/>
          <label htmlFor="bar" className="label-bar"><img className="img-bar"></img></label>
          <div className="nav-bar-container">
            <div className="nav-bar">
              <div className="bar-container"><img src={line}></img><button className="nav-bar__btn" onClick={() => navigate(AppRoute.Profile)}>Личный кабинет</button></div>
              <div className="bar-container"><img src={line}></img><button className="nav-bar__btn" onClick={handleClose}>Выйти</button></div>
            </div>
          </div>
        </section>
      )}
      {authorizationStatus === 'ADMIN_APP' && (
        <section className="header">
          <img className="logo" alt="logo" src={logo}/>
          <button className="logout__btn" onClick={handleClose}></button>
          <input type="checkbox" id="bar" className="input-bar"/>
          <label htmlFor="bar" className="label-bar"><img className="img-bar"></img></label>
          <div className="nav-bar-container">
            <div className="nav-bar">

              <div className="bar-container"><img src={line}></img><button className="nav-bar__btn" onClick={handleClose}>Выйти</button></div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}