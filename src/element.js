// element-ui 按需加载组件
import { Tree } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default (Vue) => {
  Vue.use(Tree)
}