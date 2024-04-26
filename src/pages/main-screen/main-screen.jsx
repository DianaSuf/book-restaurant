import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import logo from '/logo.svg'
import ModalRegister from '../../components/modal/modal';
import { useState } from 'react'
import './main-screen.css'

export default function MainScreen() {
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>TableTme</title>
      </Helmet>
      <section className="header">
          <Link className="logo" to="/"><img className="logo_link" alt="logo" src={logo}/></Link>
          <button className="image-button" onClick={() => setModalRegisterIsOpen(true)}></button>
          <ModalRegister
          isOpen={modalRegisterIsOpen}
          onClose={() => setModalRegisterIsOpen(false)}/>
      </section>
      <section className="promo"></section>
    </>
  )
}
