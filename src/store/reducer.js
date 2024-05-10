import { AuthorizationStatus } from "../const.js";
import { requireAuthorization, setQuestionsDataLoadingStatus, loadDataAdmin } from "./action.js";
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isQuestionsDataLoading: false,
  data: [],
};

export const reducer = createReducer(initialState,  (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setQuestionsDataLoadingStatus, (state, action) => {
      state.isQuestionsDataLoading = action.payload;
    })
    .addCase(loadDataAdmin, (state, action) => {
      if (state.authorizationStatus === AuthorizationStatus.ADMIN_REST) {
        state.data = action.payload;
      }
    });
})
