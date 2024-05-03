import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { AppRoute } from '../const';

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  requiredStatus: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default function PrivateRoute({ authorizationStatus, requiredStatus, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus !== requiredStatus) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, requiredStatus, navigate]);

  return (
    authorizationStatus === requiredStatus
      ? children
      : null
  );
}