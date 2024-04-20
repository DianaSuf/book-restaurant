// import { Navigate } from "react-router-dom";
import ModalRegister from "./modal/modal";
import { useState } from "react";
import { AuthorizationStatus } from "../const";
import PropTypes from 'prop-types';

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default function PrivateRoute({ authorizationStatus, children }) {
  const [modalRegIsOpen, setModalRegIsOpen] = useState(true);
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : /*<Navigate to={"/"} />*/<ModalRegister isOpen={modalRegIsOpen} onClose={() => setModalRegIsOpen(false)}/>
  );
}
