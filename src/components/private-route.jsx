// import { Navigate } from "react-router-dom";
import ModalRegister from "./modal-register/modal-register";
import { useState } from "react";
import { AuthorizationStatus } from "../const.js";
import PropTypes from 'prop-types';

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default function PrivateRoute({ authorizationStatus, children }) {
  const [modalRegIsOpen, setModalRegIsOpen] = useState(true);
  return (
    authorizationStatus === AuthorizationStatus.SuperAdmin
      ? children
      : /*<Navigate to={"/"} />*/<ModalRegister isOpen={modalRegIsOpen} onClose={() => setModalRegIsOpen(false)}/>
  );
}
