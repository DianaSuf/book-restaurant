import { useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import PropTypes from 'prop-types';

HistoryRouter.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    location: PropTypes.object,
    listen: PropTypes.func,
  }).isRequired,
  basename: PropTypes.string,
  children: PropTypes.node,
};

function HistoryRouter({
  basename,
  children,
  history,
}) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;