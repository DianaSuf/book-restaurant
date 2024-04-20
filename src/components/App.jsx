// import { useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '../../../public/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MainScreen from '../pages/main-screen/main-screen'
import PrivateRoute from './private-route'
import { AuthorizationStatus } from '../const'

function App() {
  // const [count, setCount] = useState(0)

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
    // <>
    //   {/* <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p> */}
    //   <div className="header">
    //     <a className="logo"><img className="logo_link" alt="logo" src={logo}/></a>
    //     <a className="profile"><img className="profile_link" alt="profile" src={profile}/></a>
    //   </div>
    // </>
  )
}

export default App
