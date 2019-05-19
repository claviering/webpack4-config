import "@babel/polyfill" // 必需放最上面
import '@/css/index'
import App from './App'
import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '@/redux/reducers'
import 'antd/dist/antd.css'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);