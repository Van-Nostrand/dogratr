import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import { store, persistor } from '@/store'
import '@/scss/main.scss'

const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
