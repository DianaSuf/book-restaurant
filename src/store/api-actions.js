import { createAsyncThunk } from '@reduxjs/toolkit';
import { requireAuthorization } from './action.js';
import { AuthorizationStatus, APIRoute } from '../const.js';

export const registerAction = createAsyncThunk(
  'user/register',
  async ({ username, realname, email, phone, password }, { dispatch, extra: api }) => {
    const { data: { token, role } } = await api.post(APIRoute.Register, { username, realname, email, phone, password });
    localStorage.setItem("token", token/*token.data.accessToken*/);
    dispatch(requireAuthorization(AuthorizationStatus[role]));
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data: { role } } = await api.get(APIRoute.Status);
      dispatch(requireAuthorization(AuthorizationStatus[role]));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token, role } } = await api.post(APIRoute.Login, { email, password });
    localStorage.setItem("token", token/*token.data.accessToken*/);
    dispatch(requireAuthorization(AuthorizationStatus[role]));
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async (_arg, { dispatch}) => {
    localStorage.removeItem("token");
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
