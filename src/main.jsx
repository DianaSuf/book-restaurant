import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import { store } from './store'
import { checkAuthAction, fetchRestaurantsAction } from './store/api-actions.js'

store.dispatch(checkAuthAction());
store.dispatch(fetchRestaurantsAction());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
