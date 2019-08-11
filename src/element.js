// element-ui 按需加载组件
import { Tree, Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default (Vue) => {
  Vue.use(Tree)
  Vue.use(Button)
}