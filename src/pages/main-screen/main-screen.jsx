import logo from '../../../public/logo.svg'
import promo from '../../../public/promo.jpg'
import ModalRegister from '../../components/modal/modal';
import { useState } from 'react'
import './main-screen.css'

export default function MainScreen() {
  const [modalRegIsOpen, setModalRegIsOpen] = useState(false);

  return (
    <>
      <header className="header">
          <a className="logo"><img className="logo_link" alt="logo" src={logo}/></a>
          <button className="image-button" onClick={() => setModalRegIsOpen(true)}></button>
          <ModalRegister
          isOpen={modalRegIsOpen}
          onClose={() => setModalRegIsOpen(false)}/>
      </header>
      <section className="hero">
        <img className="promo" alt="promo" src={promo}></img>
      </section>
    </>
  )
}