import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { AppRoute } from '../const';
import { AuthorizationStatus } from '../const';

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  requiredStatuses: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.element.isRequired,
};

export default function PrivateRoute({ authorizationStatus, requiredStatuses, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!requiredStatuses.includes(authorizationStatus)) {
      if (authorizationStatus === AuthorizationStatus.USER) {
        navigate(AppRoute.Root);
      }
      if (authorizationStatus === AuthorizationStatus.NoAuth) {
        navigate(AppRoute.Root);
      }
      if (authorizationStatus === AuthorizationStatus.Unknown) {
        navigate(AppRoute.Root);
      }
      if (authorizationStatus === AuthorizationStatus.ADMIN_APP) {
        navigate(AppRoute.SuperAdmin);
      }
      if (authorizationStatus === AuthorizationStatus.ADMIN_REST) {
        navigate(AppRoute.Restaurant);
      }
    }
  }, [authorizationStatus, requiredStatuses, navigate]);

  return (
    requiredStatuses.includes(authorizationStatus)
      ? children
      : null
  );
}
