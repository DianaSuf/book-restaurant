import { Routes, Route} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MainScreen from '../pages/main-screen/main-screen'
import ErrorScreen from '../pages/error-screen/error-screen'
import SuperScreen from '../pages/super/super-screen/super-screen'
import RestCardScreen from '../pages/admin/rest-card-screen/rest-card-screen'
import RestCardEditScreen from '../pages/admin/rest-card-edit-screen/rest-card-edit-screen'
import ReservalScreen from '../pages/admin/reserval-screen/reserval-screen'
import TableScreen from '../pages/admin/table-screen/table-screen'
import PrivateRoute from './private-route'
import { useAppSelector } from '../hook'
import browserHistory from '../browser-history'
import HistoryRouter from './history-route'
import { AppRoute } from '../const'
import { AuthorizationStatus } from '../const'
import LoadingScreen from '../pages/loading-screen/loading-screen'

function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isQuestionsDataLoading = useAppSelector((state) => state.isQuestionsDataLoading);

  if (isQuestionsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
              path={AppRoute.Root}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatuses={[AuthorizationStatus.NoAuth, AuthorizationStatus.USER, AuthorizationStatus.Unknown]}
                >
                  <MainScreen />
                </PrivateRoute>
              }
          />
          <Route
              path={AppRoute.SuperAdmin}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatuses={[AuthorizationStatus.ADMIN_APP]}
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
                  requiredStatuses={[AuthorizationStatus.ADMIN_REST]}
                >
                  <RestCardScreen />
                </PrivateRoute>
              }
          />
          <Route
                path={AppRoute.Edit}
                element={
                  <PrivateRoute
                    authorizationStatus={authorizationStatus}
                    requiredStatuses={[AuthorizationStatus.ADMIN_REST]}
                  >
                    <RestCardEditScreen />
                  </PrivateRoute>
                }
          />
          <Route
                path={AppRoute.Reserval}
                element={
                  <PrivateRoute
                    authorizationStatus={authorizationStatus}
                    requiredStatuses={[AuthorizationStatus.ADMIN_REST]}
                  >
                    <ReservalScreen />
                  </PrivateRoute>
                }
          />
          <Route
                path={AppRoute.Table}
                element={
                  <PrivateRoute
                    authorizationStatus={authorizationStatus}
                    requiredStatuses={[AuthorizationStatus.ADMIN_REST]}
                  >
                    <TableScreen />
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
