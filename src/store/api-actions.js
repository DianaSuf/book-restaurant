import { createAsyncThunk } from '@reduxjs/toolkit';
import { requireAuthorization, redirectToRoute, setDataLoadingStatus, loadData, loadDataAllRest, loadReserval } from './action.js';
import { AuthorizationStatus, APIRoute, AppRoute } from '../const.js';

export const registerAction = createAsyncThunk(
  'user/register',
  async ({ username, realname, email, phone, password }, { dispatch, extra: api }) => {
    const { data: { token, role } } = await api.post(APIRoute.Register, { username, realname, email, phone, password });
    localStorage.setItem("token", token);
    dispatch(requireAuthorization(AuthorizationStatus[role]));
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data: { role } } = await api.get(APIRoute.Status);
      dispatch(requireAuthorization(AuthorizationStatus[role]));
      if (AuthorizationStatus[role] === AuthorizationStatus.ADMIN_REST) {
        dispatch(fetchRestaurantAdminAction());
        dispatch(redirectToRoute(AppRoute.Restaurant))
      }
      if (AuthorizationStatus[role] === AuthorizationStatus.ADMIN_APP) {
        dispatch(redirectToRoute(AppRoute.SuperAdmin))
      }
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ username, password }, { dispatch, extra: api }) => {
    const { data: { token, role } } = await api.post(APIRoute.Login, { username, password });
    localStorage.setItem("token", token);
    dispatch(requireAuthorization(AuthorizationStatus[role]));
    if (AuthorizationStatus[role] === AuthorizationStatus.ADMIN_APP) {
      dispatch(redirectToRoute(AppRoute.SuperAdmin))
    }
    if (AuthorizationStatus[role] === AuthorizationStatus.ADMIN_REST) {
      dispatch(fetchRestaurantAdminAction());
      dispatch(redirectToRoute(AppRoute.Restaurant))
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async (_arg, { dispatch }) => {
    localStorage.removeItem("token");
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const AddAdmin = createAsyncThunk(
  'superAdmin/addAdmin',
  async ({ username, email }, { extra: api }) => {
    await api.post(APIRoute.SuperAdmin, { username, email });
  },
);

export const fetchRestaurantsAction = createAsyncThunk(
  'data/fetchRestaurants',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get(APIRoute.UserRestaurants);
    dispatch(loadDataAllRest(data));
    dispatch(setDataLoadingStatus(false));
  }
);

export const fetchRestaurantAction = createAsyncThunk(
  'data/fetchRestaurant',
  async ({id}, {dispatch, extra: api}) => {
    // dispatch(setDataLoadingStatus(true));
    try {
      const {data} = await api.get(`${APIRoute.UserRestaurants}/${id}`);
      dispatch(loadData(data))
      // dispatch(setDataLoadingStatus(false))
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
      // dispatch(setDataLoadingStatus(false))
      return undefined;
    }
    // dispatch(setDataLoadingStatus(false));
  }
);

export const fetchRestaurantAdminAction = createAsyncThunk(
  'dataAdmin/fetchRestaurant',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get(APIRoute.AdminRest);
    dispatch(loadData(data))
    dispatch(setDataLoadingStatus(false));
  }
);

export const fetchRestaurantAdminUpdateAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdate',
  async ({ name, town, address, opening, ending, phone, description }, {dispatch, extra: api }) => {
    await api.post(APIRoute.AdminRestUpdate, { name, town, address, opening, ending, phone, description });
    dispatch(fetchRestaurantAdminAction());
  },
);

export const fetchRestaurantAdminUpdateTableAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdateTable',
  async ({ table }, {dispatch, extra: api }) => {
    await api.post(APIRoute.AdminRestUpdateTable, { table });
    dispatch(fetchRestaurantAdminAction());
  },
);

export const fetchRestaurantAdminUpdatePhotoAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdateMenu',
  async ({ photo1, photo2, photo3 }, {dispatch, extra: api }) => {
    await api.post(APIRoute.AdminRestUpdatePhoto, { photo1, photo2, photo3 });
    dispatch(fetchRestaurantAdminAction());
  },
);

export const fetchRestaurantAdminUpdateMenuAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdateMenu',
  async ({ photo }, {dispatch, extra: api }) => {
    await api.post(APIRoute.AdminRestUpdateMenu, { photo });
    dispatch(fetchRestaurantAdminAction());
  },
);

export const fetchRestaurantAdminUpdatePlanAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdatePlan',
  async ({ photo }, {dispatch, extra: api }) => {
    await api.post(APIRoute.AdminRestUpdatePlan, { photo });
    dispatch(fetchRestaurantAdminAction());
  },
);

export const fetchReservalAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdate',
  async ({ id, date, timeStart, timeEnd, persons, message }, {dispatch, extra: api }) => {
    try {
      const { data } = await api.post(`${APIRoute.ResevalRestaurant}/${id}`, { date, timeStart, timeEnd, persons, message});
      dispatch(loadReserval(data))
      dispatch(redirectToRoute(`${AppRoute.Table}/${id}`));
    }
    catch {
      return undefined;
    }
  },
);

export const fetchTableAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdate',
  async ({ id, date, timeStart, timeEnd, persons, message, table }, {dispatch, extra: api }) => {
    try {
      await api.post(`${APIRoute.TableRestaurant}/${id}`, { date, timeStart, timeEnd, persons, message, table });
      dispatch(redirectToRoute(`${AppRoute.Restaurant}/${id}`));
    }
    catch {
      return undefined;
    }
  },
);

export const fetchReservalAdminAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdate',
  async ({ name, phone, date, timeStart, timeEnd, persons, message }, {dispatch, extra: api }) => {
    try {
      const { data } = await api.post(APIRoute.AdminResevalRestaurant, { name, phone, date, timeStart, timeEnd, persons, message});
      dispatch(loadReserval(data))
      dispatch(redirectToRoute(AppRoute.Table));
    }
    catch {
      return undefined;
    }
  },
);

export const fetchTableAdminAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdate',
  async ({ name, phone, date, timeStart, timeEnd, persons, message, table }, {dispatch, extra: api }) => {
    try {
      await api.post(APIRoute.AdminTableRestaurant, {  name, phone, date, timeStart, timeEnd, persons, message, table });
      dispatch(redirectToRoute(AppRoute.Restaurant));
    }
    catch {
      return undefined;
    }
  },
);

export const fetchUserProfileAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdate',
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.ProfileUser);
      return data;
    }
    catch {
      return undefined;
    }
  },
);

export const fetchUserProfileUpdateAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdatePlan',
  async ({ username, realname, email, phone }, { dispatch, extra: api }) => {
    await api.post(APIRoute.ProfileUserUpdate, { username, realname, email, phone });
    dispatch(fetchUserProfileAction());
  },
);

export const fetchAdminProfileAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdate',
  async ({ date }, { extra: api }) => {
    try {
      const { data } = await api.post(APIRoute.ProfileAdmin, { date });
      return data;
    }
    catch {
      return undefined;
    }
  },
);

export const fetchAdminProfileUpdateAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdatePlan',
  async ({ username, email, phone }, { dispatch, extra: api }) => {
    await api.post(APIRoute.ProfileAdminUpdate, { username, email, phone });
    dispatch(fetchAdminProfileAction());
  },
);
