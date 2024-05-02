import browserHistory from "../../browser-history";
//push??
const redirect = () => (next) => (action) => {
  if (action.type === 'app/redirectToRoute') {
    browserHistory.replace(action.payload);
  }

  return next(action);
};

export default redirect;