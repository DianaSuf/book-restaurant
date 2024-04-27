import store from '/store/index.js'

export const getState = () => store.getState();

export const AppDispatch = store.dispatch;