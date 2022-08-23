import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Routes from '@/components/Routes'
// import Navbar from '@/components/Navbar'
import TopNav from '@/components/TopNav'
import '@/scss/main.scss'
import { store, persistor } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="page-content">
            {/* <Navbar /> */}
            <TopNav />
            <div className="route-content">
              <Routes />
            </div>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
