import { createAsyncThunk } from '@reduxjs/toolkit';
import { requireAuthorization, redirectToRoute, setDataLoadingStatus, loadData, loadDataAllRest, loadReserval, clearDataReserval } from './action.js';
import { AuthorizationStatus, APIRoute, AppRoute } from '../const.js';

export const registerAction = createAsyncThunk(
  'user/register',
  async ({ username, realname, email, phone, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data: { token, role } } = await api.post(APIRoute.Register, { username, realname, email, phone, password });
      localStorage.setItem("token", token);
      dispatch(requireAuthorization(AuthorizationStatus[role]));
    } catch(error) {
      if (error.response.status === 400) {
        return rejectWithValue(error.response.data)
      }
      throw error;
    }
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
  async ({ username, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
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
    } catch(error) {
      if (error.response.status === 400) {
        return rejectWithValue(error.response.data)
      }
      throw error;
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

export const addAdmin = createAsyncThunk(
  'superAdmin/addAdmin',
  async ({ username, email }, { extra: api, rejectWithValue }) => {
    try {
      await api.post(APIRoute.SuperAdmin, { username, email });
    } catch(error) {
      if (error.response.status === 400) {
        return rejectWithValue(error.response.data)
      }
      throw error;
    }
  },
);

export const deleteAdmin = createAsyncThunk(
  'superAdmin/addAdmin',
  async ({ username, email }, { extra: api, rejectWithValue }) => {
    try {
      await api.post(APIRoute.SuperAdminDelete, { username, email });
    } catch(error) {
      if (error.response.status === 400) {
        return rejectWithValue(error.response.data)
      }
      throw error;
    }
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

export const fetchSaleAction = createAsyncThunk(
  'dataAdmin/fetchSaleAction',
  async ({ id }, {extra: api}) => {
    try {
      const {data} = await api.get(`${APIRoute.AdminSale}/${id}`);
      return data;
    }
    catch {
      return undefined;
    }
  },
);

export const saleCreateAction = createAsyncThunk(
  'dataAdmin/saleCreateAction',
  async ({ name, text, photo }, { dispatch, extra: api }) => {
    await api.post(APIRoute.AdminSale, { name, text, photo });
    await dispatch(fetchRestaurantAdminAction());
    dispatch(redirectToRoute(AppRoute.Sale))
  },
);

export const saleUpdateAction = createAsyncThunk(
  'dataAdmin/saleUpdateAction',
  async ({ id, name, text, photo }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.AdminSaleUpdate}/${id}`, { name, text, photo });
    await dispatch(fetchRestaurantAdminAction());
    dispatch(redirectToRoute(AppRoute.Sale))
  },
);

export const saleDeleteAction = createAsyncThunk(
  'dataAdmin/saleDeleteAction',
  async ({ id }, { dispatch, extra: api }) => {
    await api.delete(`${APIRoute.AdminSaleDelete}/${id}`);
    dispatch(fetchRestaurantAdminAction());
  },
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
  'dataAdmin/fetchRestaurantUpdatePhotos',
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
  'reserval/fetchReserval',
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
  'reserval/fetchTable',
  async ({ id, date, timeStart, timeEnd, persons, message, table }, {dispatch, extra: api }) => {
    try {
      await api.post(`${APIRoute.TableRestaurant}/${id}`, { date, timeStart, timeEnd, persons, message, table });
      dispatch(redirectToRoute(`${AppRoute.Restaurant}/${id}`));
      dispatch(clearDataReserval())
    }
    catch {
      return undefined;
    }
  },
);

export const fetchReservalAdminAction = createAsyncThunk(
  'reserval/fetchReservalAdmin',
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
  'reserval/fetchTableAdmin',
  async ({ name, phone, date, timeStart, timeEnd, persons, message, table }, {dispatch, extra: api }) => {
    try {
      await api.post(APIRoute.AdminTableRestaurant, {  name, phone, date, timeStart, timeEnd, persons, message, table });
      dispatch(redirectToRoute(AppRoute.Restaurant));
      dispatch(clearDataReserval())
    }
    catch {
      return undefined;
    }
  },
);

export const fetchUserProfileAction = createAsyncThunk(
  'dataProfile/fetchUserProfile',
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
  'dataProfile/fetchUserProfileUpdate',
  async ({ username, realname, email, phone }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data: { token } } = await api.post(APIRoute.ProfileUserUpdate, { username, realname, email, phone });
      localStorage.removeItem("token");
      localStorage.setItem("token", token);
      dispatch(fetchUserProfileAction());
    } catch(error) {
      if (error.response.status === 400) {
        return rejectWithValue(error.response.data)
      }
      throw error;
    }
  },
);

export const fetchAdminProfileAction = createAsyncThunk(
  'dataAdminProfile/fetchAdminProfile',
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
  'dataAdminProfile/fetchAdminProfileUpdate',
  async ({ username, email, phone }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data: { token } } = await api.post(APIRoute.ProfileAdminUpdate, { username, email, phone });
      localStorage.removeItem("token");
      localStorage.setItem("token", token);
      dispatch(fetchAdminProfileAction());
    } catch(error) {
      if (error.response.status === 400) {
        return rejectWithValue(error.response.data)
      }
      throw error;
    }
  },
);

export const reviewAction = createAsyncThunk(
  'review/reviewReserval',
  async ({ idReserval, text, grade }, { extra: api }) => {
    await api.post(APIRoute.Review, { idReserval, text, grade });
    window.location.reload();
    // await dispatch(fetchUserProfileAction());
    // dispatch(redirectToRoute(AppRoute.Profile))
  },
);

export const cancelReservalAction = createAsyncThunk(
  'delete/cancelReserval',
  async ({ id }, { extra: api }) => {
    await api.delete(`${APIRoute.CancelReserval}/${id}`);
    // dispatch(fetchAdminProfileAction());
  },
);

export const cancelReservalAdminAction = createAsyncThunk(
  'delete/cancelReserval',
  async ({ id }, { extra: api }) => {
    await api.delete(`${APIRoute.AdminCancelReserval}/${id}`);
    // dispatch(fetchAdminProfileAction());
  },
);
