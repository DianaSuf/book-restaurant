import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MainScreen from '../pages/main-screen/main-screen'
import PrivateRoute from './private-route'
import { AuthorizationStatus } from '../const'

function App() {
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
                  authorizationStatus={AuthorizationStatus.NoAuth}
                >
                  <MainScreen />
                </PrivateRoute>
              }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
