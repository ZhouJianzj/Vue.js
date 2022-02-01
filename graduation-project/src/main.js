import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/iconfonts/iconfont.css'
import axios from 'axios'

//挂载axios
Vue.prototype.$http=axios
//设置axios的默认的请求路径的基本路径
axios.defaults.baseURL = 'http://localhost'




//全局样式
import css from './assets/css.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
