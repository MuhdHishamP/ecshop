import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { initialState } from './store.jsx'
import store from './store.jsx'
import './index.css'
import './bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} serverState={initialState}>
    <App />
  </Provider>,
)
