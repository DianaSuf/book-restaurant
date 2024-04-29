// import ModalRegister from "./modal-register/modal-register";
// import { useState } from "react";
import { AuthorizationStatus } from "../const.js";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default function PrivateRoute({ authorizationStatus, children }) {
  // const [modalRegIsOpen, setModalRegIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    authorizationStatus === AuthorizationStatus.ADMIN_APP
      ? children
      : /*(authorizationStatus === AuthorizationStatus.NoAuth) ? <ModalRegister isOpen={modalRegIsOpen} onClose={() => setModalRegIsOpen(false)}/> :*/ navigate('/')
  );
}
