import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import Routes from '@/components/Routes'
// import Navbar from '@/components/Navbar'
import '@/scss/main.scss'
import store from '@/store'
import { Provider } from 'react-redux'
import ReduxTest from '@/components/ReduxTest'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="page-content">
          {/* <Navbar />
          <Routes /> */}
          <ReduxTest />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
