import {createAction} from '@reduxjs/toolkit';

export const requireAuthorization = createAction('user/requireAuthorization');
export const redirectToRoute = createAction('app/redirectToRoute');
export const setDataLoadingStatus = createAction('data/setDataLoadingStatus');
export const loadDataAllRest = createAction('data/restaurants');
export const loadData = createAction('data/restaurant');
export const loadReserval = createAction('data/reserval');
