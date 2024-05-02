// import ModalRegister from "./modal-register/modal-register";
// import { useState } from "react";
// import { AuthorizationStatus } from "../const.js";
// import PropTypes from 'prop-types';
// import { useNavigate } from "react-router-dom";

// PrivateRoute.propTypes = {
//   authorizationStatus: PropTypes.string.isRequired,
//   requiredStatus: PropTypes.string.isRequired,
//   children: PropTypes.element.isRequired,
// };

// export default function PrivateRoute({ authorizationStatus, requiredStatus, children }) {
//   // const [modalRegIsOpen, setModalRegIsOpen] = useState(true);
//   const navigate = useNavigate();

//   return (
//     authorizationStatus === requiredStatus
//       ? children
//       : navigate('/') /*(authorizationStatus === AuthorizationStatus.NoAuth) ? <ModalRegister isOpen={modalRegIsOpen} onClose={() => setModalRegIsOpen(false)}/> :*/
//   );
// }
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  requiredStatus: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default function PrivateRoute({ authorizationStatus, requiredStatus, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus !== requiredStatus) {
      navigate('/');
    }
  }, [authorizationStatus, requiredStatus, navigate]);

  return (
    authorizationStatus === requiredStatus
      ? children
      : null
  );
}