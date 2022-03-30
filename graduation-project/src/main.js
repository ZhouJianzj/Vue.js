import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import'./assets/iconfonts/kaiguan'
import'./assets/iconfonts/suo'
import './assets/iconfonts/iconfont.css'
import './assets/font_menu/iconfont.css'
import './assets/iconfonts/tonggou/iconfont.css'
import './assets/iconfonts/shibai/iconfont.css'
import './assets/iconfonts/lianjie/iconfont'

import axios from 'axios'
//拦截器给每次请求附带token的
axios.interceptors.request.use(requestConfig =>{
  requestConfig.headers.token = window.sessionStorage.getItem("token")
  requestConfig.headers.username = window.sessionStorage.getItem("username")
  return requestConfig
})
//挂载axios
Vue.prototype.$http=axios
//设置axios的默认的请求路径的基本路径
axios.defaults.baseURL = 'http://localhost'


//全局样式
import css from './assets/css.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
