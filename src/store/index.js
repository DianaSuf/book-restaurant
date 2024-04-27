import {configureStore} from '@reduxjs/toolkit';
import { reducer } from './reducer.js';
// import { createAPI } from '../services/api';

// export const api = createAPI();

export const store = configureStore({
  reducer,
})

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       thunk: {
//         extraArgument: api,
//       },
//     }),
// });
