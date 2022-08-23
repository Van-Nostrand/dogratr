import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Routes from '@/components/Routes'
// import Navbar from '@/components/Navbar'
import TopNav from '@/components/TopNav'
import '@/scss/main.scss'
import store from '@/store'
import { Provider } from 'react-redux'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="page-content">
          {/* <Navbar /> */}
          <TopNav />
          <div className="route-content">
            <Routes />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
