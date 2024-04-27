import { Link } from 'react-router-dom';
import logo from '/logo.svg'
import './header.css'
import { useSelector } from 'react-redux';
import ModalRegister from '../modal-register/modal-register';
import { useState } from 'react'

export default function Header() {
  const authorizationStatus = useSelector((state) => state.authorizationStatus);
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);

  return (
    <>
      <section className="header">
          <Link className="logo" to="/"><img className="logo_link" alt="logo" src={logo}/></Link>
          {(authorizationStatus === 'UNKNOWN' || authorizationStatus === 'NO_AUTH') && (
            <div className="login">
              <button className="login__btn" onClick={() => setModalRegisterIsOpen(true)}></button>
              <ModalRegister
              isOpen={modalRegisterIsOpen}
              onClose={() => setModalRegisterIsOpen(false)}/>
            </div>
          )}
          {authorizationStatus === 'USER' && (
            <div className="user_panel">
            </div>
          )}
          {authorizationStatus === 'ADMIN' && (
            <div className="admin_panel">
            </div>
          )}
          {authorizationStatus === 'SUPER_ADMIN' && (
            <div className="logout">
              <button className="logout__btn" ></button>
            </div>
          )}
      </section>
    </>
  )
}