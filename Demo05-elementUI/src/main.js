import Vue from 'vue'
import App from "./App";
//使用路由
import router from "./router"
//使用elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 使用axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el:'#app',
  // render: h => h(App)
  //注意这里不能使用Router
  router,
  render: h => h(App),
})
