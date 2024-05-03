import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { AppRoute } from '../const';
import { AuthorizationStatus } from '../const';

PrivateRouteAdmins.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default function PrivateRouteAdmins({ authorizationStatus, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.NoAuth && authorizationStatus 
      !== AuthorizationStatus.Unknown && authorizationStatus !== AuthorizationStatus.USER) {
      if (authorizationStatus === AuthorizationStatus.ADMIN_APP) {
        navigate(AppRoute.SuperAdmin);
      }
      if (authorizationStatus === AuthorizationStatus.ADMIN_REST) {
        navigate(AppRoute.Admin);
      }
    }
  }, [authorizationStatus, navigate]);

  return (
    (authorizationStatus === AuthorizationStatus.NoAuth) || 
    (authorizationStatus === AuthorizationStatus.Unknown) || (authorizationStatus === AuthorizationStatus.USER)
      ? children
      : null
  );
}