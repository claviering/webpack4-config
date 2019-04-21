import "@babel/polyfill" // 必需放最上面
import ReactDOM from "react-dom"
import App from './App'
import '@/css/index'

ReactDOM.render(
  <App/>,
  document.getElementById("app")
);