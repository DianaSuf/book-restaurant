import ModalRegister from '../../components/modal/modal';
import { useState } from 'react'
import './login.css'

export default function Login() {
  const [modalRegisterIsOpen, setModalRegisterIsOpen] = useState(false);

  return (
    <>
      <div className="login">
          <button className="image-button" onClick={() => setModalRegisterIsOpen(true)}></button>
          <ModalRegister
          isOpen={modalRegisterIsOpen}
          onClose={() => setModalRegisterIsOpen(false)}/>
      </div>
    </>
  )
}
