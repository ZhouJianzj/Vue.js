// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//这里会自动的识别index文件
import router from "./router/index"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //声明路由,来自于import
  router,
  //表示的是这个对象有一个组件叫App  来自于import
  components: { App },
  template: '<App/>'
})
