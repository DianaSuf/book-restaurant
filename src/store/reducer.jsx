import { AuthorizationStatus } from "../const";
import { requireAuthorization } from "./action";
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
