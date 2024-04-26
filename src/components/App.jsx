import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MainScreen from '../pages/main-screen/main-screen'
import ErrorScreen from '../pages/error-screen/error-screen'
// import SuperScreen from '../pages/super/super-screen/super-screen'
import PrivateRoute from './private-route'
import { useSelector } from 'react-redux'

function App() {
  const authorizationStatus = useSelector((state) => state.authorizationStatus);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
              path={'/'}
              element={<MainScreen />}
          />
          <Route
              path={'/res'}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                >
                  <MainScreen />
                </PrivateRoute>
              }
          />
          <Route
              path={'*'}
              element={<ErrorScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
