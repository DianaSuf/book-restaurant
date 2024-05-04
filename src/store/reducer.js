import { AuthorizationStatus } from "../const.js";
import { requireAuthorization, loadData } from "./action.js";
import {createReducer} from '@reduxjs/toolkit';
// import { useAppSelector } from '../hook'

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  data: [],
};

// const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

export const reducer = createReducer(initialState,  (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadData, (state, action) => {
      if (state.authorizationStatus === AuthorizationStatus.ADMIN_REST) {
        state.data = action.payload;
      }
    });
})
