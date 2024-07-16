import { Link } from 'react-router-dom';
import logo from '/logo.svg'
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

  return (
    <>
      {(authorizationStatus === 'UNKNOWN' || authorizationStatus === 'NO_AUTH') && (
        <section className="header">
          <Link className="logo" to="/" onClick={handleLogoClick}></Link>
          <button className="login__btn" onClick={() => setModalRegisterIsOpen(true)}></button>
          <ModalRegister
          isOpen={modalRegisterIsOpen}
          onClose={() => setModalRegisterIsOpen(false)}/>
        </section>
      )}
      {authorizationStatus === 'USER' && (
        <section className="header">
          <Link className="logo" to="/" onClick={handleLogoClick}></Link>
          <button className="logout__btn" onClick={handleClose}></button>
          <button className="profile__btn" onClick={() => navigate(AppRoute.Profile)}></button>
        </section>
      )}
      {authorizationStatus === 'ADMIN_REST' && (
        <section className="header">
          <Link className="logo" to="/restaurant"></Link>
          <button className="logout__btn" onClick={handleClose}></button>
          <button className="profile__btn" onClick={() => navigate(AppRoute.Profile)}></button>
        </section>
      )}
      {authorizationStatus === 'ADMIN_APP' && (
        <section className="header">
          <img className="logo" alt="logo" src={logo}/>
          <button className="logout__btn" onClick={handleClose}></button>
        </section>
      )}
    </>
  )
}