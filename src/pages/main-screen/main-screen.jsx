import logo from '../../../public/logo.svg'
// import profile from '../../../public/profile.svg'
import ModalRegister from '../../components/modal/modal';
import { useState } from 'react'
import './main-screen.css'

export default function MainScreen() {
  const [modalRegIsOpen, setModalRegIsOpen] = useState(false);

  return (
    <>
      <div className="header">
          <a className="logo"><img className="logo_link" alt="logo" src={logo}/></a>
          <button className="image-button" onClick={() => setModalRegIsOpen(true)}></button>
          <ModalRegister
          isOpen={modalRegIsOpen}
          onClose={() => setModalRegIsOpen(false)}/>
      </div>
    </>
  )
}