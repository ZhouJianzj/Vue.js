import Vue from 'vue'
import MyRouter from 'vue-router'
import Txt from '../components/Txt'


Vue.use(MyRouter)
export default new MyRouter({
  routes:[
    {
      path:'/t',
      component:Txt,
      // 嵌套路由
      // child:[
      //   {path:"",component:}
      // ]
    }

  ]
})
