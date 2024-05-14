import ModalRegister from "./modal-register/modal-register";
import { useState } from "react";
import PropTypes from 'prop-types';

PrivateRouteReservations.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  requiredStatuses: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.element.isRequired,
};

export default function PrivateRouteReservations({ authorizationStatus, requiredStatuses, children }) {
  const [modalRegIsOpen, setModalRegIsOpen] = useState(true);
  return (
    requiredStatuses.includes(authorizationStatus)
      ? children
      : <ModalRegister isOpen={modalRegIsOpen} onClose={() => setModalRegIsOpen(false)}/>
  );
}