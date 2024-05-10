import {createAction} from '@reduxjs/toolkit';

export const requireAuthorization = createAction('user/requireAuthorization');
export const redirectToRoute = createAction('app/redirectToRoute');
export const setQuestionsDataLoadingStatus = createAction('data/setQuestionsDataLoadingStatus');
export const loadDataAdmin = createAction('dataAdmin/restaurant');
