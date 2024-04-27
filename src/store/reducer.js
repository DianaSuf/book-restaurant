import { AuthorizationStatus } from "../const.js";
import { requireAuthorization } from "./action.js";
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState,  (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
})
