import { Routes, Route} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MainScreen from '../pages/main-screen/main-screen'
import ErrorScreen from '../pages/error-screen/error-screen'
import SuperScreen from '../pages/super/super-screen/super-screen'
import RestCardScreen from '../pages/admin/rest-card-screen/rest-card-screen'
import RestCardEditScreen from '../pages/admin/rest-card-edit-screen/rest-card-edit-screen'
import PrivateRoute from './private-route'
import { useAppSelector } from '../hook'
import browserHistory from '../browser-history'
import HistoryRouter from './history-route'
import { AppRoute } from '../const'
import { AuthorizationStatus } from '../const'
import PrivateRouteAdmins from './private-route-admins'

function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
              path={AppRoute.Root}
              element={
                <PrivateRouteAdmins
                  authorizationStatus={authorizationStatus}
                >
                  <MainScreen />
                </PrivateRouteAdmins>
              }
          />
          <Route
              path={AppRoute.SuperAdmin}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatus={AuthorizationStatus.ADMIN_APP}
                >
                  <SuperScreen />
                </PrivateRoute>
              }
          />
          <Route
              path={AppRoute.Admin}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatus={AuthorizationStatus.ADMIN_REST}
                >
                  <RestCardScreen />
                </PrivateRoute>
              }
          />
            {/* <Route
                path={AppRoute.Edit}
                element={
                  <PrivateRoute
                    authorizationStatus={authorizationStatus}
                    requiredStatus={AuthorizationStatus.ADMIN_REST}
                  >
                    <RestCardEditScreen />
                  </PrivateRoute>
                }
            /> 
          </Route>*/}
          <Route
                path={AppRoute.Edit}
                element={
                  <PrivateRoute
                    authorizationStatus={authorizationStatus}
                    requiredStatus={AuthorizationStatus.ADMIN_REST}
                  >
                    <RestCardEditScreen />
                  </PrivateRoute>
                }
          />
          <Route
              path={AppRoute.NotFound}
              element={<ErrorScreen />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  )
}

export default App
