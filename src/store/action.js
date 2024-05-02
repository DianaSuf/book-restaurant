import {createAction} from '@reduxjs/toolkit';

export const requireAuthorization = createAction('user/requireAuthorization');
export const redirectToRoute = createAction('app/redirectToRoute');
export const loadRestaurants = createAction('data/loadRestaurants');
export const loadRestaurant = createAction('data/loadRestaurant');
