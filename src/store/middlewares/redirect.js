import browserHistory from "../../browser-history";

const redirect = () => (next) => (action) => {
  if (action.type === 'app/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export default redirect;