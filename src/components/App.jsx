import { Routes, Route} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MainScreen from '../pages/main-screen/main-screen'
import ErrorScreen from '../pages/error-screen/error-screen'
import SuperScreen from '../pages/super/super-screen/super-screen'
import PrivateRoute from './private-route'
import { useAppSelector } from '../hook'
import browserHistory from '../browser-history'
import HistoryRouter from './history-route'

function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
              path={'/'}
              element={<MainScreen />}
          />
          <Route
              path={'/superadmin'}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                >
                  <SuperScreen />
                </PrivateRoute>
              }
          />
          <Route
              path={'*'}
              element={<ErrorScreen />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  )
}

export default App
