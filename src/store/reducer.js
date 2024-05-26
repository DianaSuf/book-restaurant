import { AuthorizationStatus } from "../const.js";
import { requireAuthorization, setDataLoadingStatus, loadData, loadDataAllRest, loadReserval } from "./action.js";
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
  dataRest: [],
  dataAllRest: [],
  dataReseval: [],
};

export const reducer = createReducer(initialState,  (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      // if (state.authorizationStatus === AuthorizationStatus.NoAuth) {
      //   state.dataRest = [];
      // }
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(loadData, (state, action) => {
      // state.isDataLoading = true;
      state.dataRest = action.payload;
    })
    .addCase(loadDataAllRest, (state, action) => {
      if (state.authorizationStatus !== AuthorizationStatus.ADMIN_REST 
        || state.authorizationStatus !== AuthorizationStatus.ADMIN_APP) {
        state.dataAllRest = action.payload;
      }
    })
    .addCase(loadReserval, (state, action) => {
      if (state.authorizationStatus !== AuthorizationStatus.NoAuth 
        || state.authorizationStatus !== AuthorizationStatus.Unknown 
        || state.authorizationStatus !== AuthorizationStatus.ADMIN_APP) {
        state.dataReseval = action.payload;
      }
    });
})
