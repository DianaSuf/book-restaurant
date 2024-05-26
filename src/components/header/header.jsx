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

export default function Header() {
  const authorizationStatus = useSelector((state) => state.authorizationStatus);
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = (evt) => {
    evt.preventDefault();
    navigate(AppRoute.Root)
    dispatch(logoutAction())
  }

  return (
    <>
      {(authorizationStatus === 'UNKNOWN' || authorizationStatus === 'NO_AUTH') && (
        <section className="header">
          <Link className="logo" to="/"><img className="logo_link" alt="logo" src={logo}/></Link>
          <div className="login">
            <button className="login__btn" onClick={() => setModalRegisterIsOpen(true)}></button>
            <ModalRegister
            isOpen={modalRegisterIsOpen}
            onClose={() => setModalRegisterIsOpen(false)}/>
          </div>
        </section>
      )}
      {authorizationStatus === 'USER' && (
        <section className="header">
          <Link className="logo" to="/"><img className="logo_link" alt="logo" src={logo}/></Link>
          <div className="user_panel">
            <button className="logout__btn" onClick={handleClose}></button>
            <button className="profile__btn" ></button>
          </div>
        </section>
      )}
      {authorizationStatus === 'ADMIN_REST' && (
        <section className="header">
          <img className="logo" alt="logo" src={logo}/>
          <div className="admin_panel">
            <button className="logout__btn" onClick={handleClose}></button>
            <button className="profile__btn" ></button>
          </div>
        </section>
      )}
      {authorizationStatus === 'ADMIN_APP' && (
        <section className="header">
          <img className="logo" alt="logo" src={logo}/>
          <div className="super-admin_panel">
            <button className="logout__btn" onClick={handleClose}></button>
          </div>
        </section>
      )}
    </>
  )
}