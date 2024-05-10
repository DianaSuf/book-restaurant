import { createAsyncThunk } from '@reduxjs/toolkit';
import { requireAuthorization, redirectToRoute, setQuestionsDataLoadingStatus, loadDataAdmin } from './action.js';
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
      if (AuthorizationStatus[role] === 'ADMIN_REST') {
        dispatch(fetchRestaurantAdminAction());
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
    if (AuthorizationStatus[role] === 'ADMIN_APP') {
      dispatch(redirectToRoute(AppRoute.SuperAdmin))
    }
    if (AuthorizationStatus[role] === 'ADMIN_REST') {
      dispatch(redirectToRoute(AppRoute.Admin))
      dispatch(fetchRestaurantAdminAction());
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async (_arg, { dispatch }) => {
    localStorage.removeItem("token");
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    window.location.reload();
  },
);

export const AddAdmin = createAsyncThunk(
  'superAdmin/addAdmin',
  async ({ username, email }, { extra: api }) => {
    await api.post(APIRoute.SuperAdmin, { username, email });
  },
);

// export const fetchRestaurantsAction = createAsyncThunk(
//   'data/fetchRestaurants',
//   async (_arg, {extra: api}) => {
//     const {data} = await api.get(APIRoute.Restaurants);
//     return data;
//   }
// );

// export const fetchRestaurantAction = createAsyncThunk(
//   'data/fetchRestaurant',
//   async ({id}, {dispatch, extra: api}) => {
//     try {
//       const {data} = await api.get(`${APIRoute.Restaurant}/${id}`);
//       return data;
//     } catch {
//       dispatch(redirectToRoute(AppRoute.NotFound));
//       return undefined;
//     }
//   }
// );

export const fetchRestaurantAdminAction = createAsyncThunk(
  'dataAdmin/fetchRestaurant',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setQuestionsDataLoadingStatus(true));
    const {data} = await api.get(APIRoute.AdminRest);
    dispatch(setQuestionsDataLoadingStatus(false));
    dispatch(loadDataAdmin(data))
  }
);

// export const fetchRestaurantAdminUpdateAction = createAsyncThunk(
//   'dataAdmin/fetchRestaurantUpdate',
//   async ({ name, town, street, phone, description, opening, ending, tables }, { dispatch, extra: api }) => {
//     const { data } = await api.post(APIRoute.AdminRestUpdate, { name, town, street, phone, description, opening, ending, tables });
//     dispatch(loadDataAdmin(data))
//   },
// );

export const fetchRestaurantAdminUpdateAction = createAsyncThunk(
  'dataAdmin/fetchRestaurantUpdate',
  async ({ name, town, address, opening, ending, phone, description, tables }, {dispatch, extra: api }) => {
    await api.post(APIRoute.AdminRestUpdate, { name, town, address, opening, ending, phone, description, tables });
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
