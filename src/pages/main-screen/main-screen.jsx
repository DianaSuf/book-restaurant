import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import logo from '/logo.svg'
// import promo from '/promo.jpg'
import ModalRegister from '../../components/modal/modal';
import { useState } from 'react'
import './main-screen.css'

export default function MainScreen() {
  const [modalRegIsOpen, setModalRegIsOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>TableTme</title>
      </Helmet>
      <section className="header">
          <Link className="logo" to="/"><img className="logo_link" alt="logo" src={logo}/></Link>
          <button className="image-button" onClick={() => setModalRegIsOpen(true)}></button>
          <ModalRegister
          isOpen={modalRegIsOpen}
          onClose={() => setModalRegIsOpen(false)}/>
      </section>
      <section className="promo">
        {/* <img className="promo" alt="promo" src={promo}></img> */}
      </section>
    </>
  )
}