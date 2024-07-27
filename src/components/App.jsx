import { Routes, Route} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MainScreen from '../pages/main-screen/main-screen'
import ErrorScreen from '../pages/error-screen/error-screen'
import SuperScreen from '../pages/super/super-screen/super-screen'
import ProfileScreen from '../pages/user/profile-screen/profile-screen'
import RestCardScreen from '../pages/admin/rest-card-screen/rest-card-screen'
import RestCardEditScreen from '../pages/admin/rest-card-edit-screen/rest-card-edit-screen'
import ReservalScreen from '../pages/admin/reserval-screen/reserval-screen'
import TableScreen from '../pages/admin/table-screen/table-screen'
import SaleScreen from '../pages/sale-screen/sale-screen'
import SaleEditScreen from '../pages/sale-screen/sale-edit-screen/sale-edit-screen'
import PrivateRoute from './private-route'
import { useAppSelector } from '../hooks/hook'
import browserHistory from '../browser-history'
import HistoryRouter from './history-route'
import { AppRoute } from '../const'
import { AuthorizationStatus } from '../const'
import LoadingScreen from '../pages/loading-screen/loading-screen'

function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if (isDataLoading) {
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
              path={AppRoute.Profile}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatuses={[AuthorizationStatus.USER, AuthorizationStatus.ADMIN_REST]}
                >
                  <ProfileScreen />
                </PrivateRoute>
              }
          />
          <Route
              path={AppRoute.Restaurant}
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
              path={`${AppRoute.Restaurant}/:id`}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatuses={[AuthorizationStatus.USER, AuthorizationStatus.NoAuth, AuthorizationStatus.Unknown]}
                >
                  <RestCardScreen />
                </PrivateRoute>
              }
          />
          <Route
              path={`${AppRoute.Sale}/:id`}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatuses={[AuthorizationStatus.USER, AuthorizationStatus.NoAuth, AuthorizationStatus.Unknown]}
                >
                  <SaleScreen />
                </PrivateRoute>
              }
          />
          <Route
              path={AppRoute.Sale}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatuses={[AuthorizationStatus.ADMIN_REST]}
                >
                  <SaleScreen />
                </PrivateRoute>
              }
          />
          <Route
              path={AppRoute.SaleCreate}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatuses={[AuthorizationStatus.ADMIN_REST]}
                >
                  <SaleEditScreen />
                </PrivateRoute>
              }
          />
          <Route
              path={`${AppRoute.SaleEdit}/:id`}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  requiredStatuses={[AuthorizationStatus.ADMIN_REST]}
                >
                  <SaleEditScreen />
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
                path={`${AppRoute.Reserval}/:id`}
                element={
                  <PrivateRoute
                    authorizationStatus={authorizationStatus}
                    requiredStatuses={[AuthorizationStatus.USER]}
                  >
                    <ReservalScreen />
                  </PrivateRoute>
                }
          />
          <Route
                path={`${AppRoute.Table}/:id`}
                element={
                  <PrivateRoute
                    authorizationStatus={authorizationStatus}
                    requiredStatuses={[AuthorizationStatus.USER]}
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
