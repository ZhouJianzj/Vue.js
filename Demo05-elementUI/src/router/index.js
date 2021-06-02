import Vue from "vue"
import Router from "vue-router"




Vue.use(Router)
export default new Router({
  routes:[
    {
      path:"/dir",
      name:"dir",
      component: () =>import("../view/Dir"),
      //嵌套路由
      child:[
        {
          path:"/childView",
          name:"childView",
          component:()=>import("../view/childView")

        }
      ]
    },
    {
      //路由信息里面声明参数
      path: "/login/:id/:name",
      name: "login",
      component: () =>import("../view/Login"),
      //小道具需要使用
      props:true
    },

    {
      path:"/axiosOne",
      component:()=>import("../view/axiosOne")
    },
    {
      path: "/axiosTwo",
      component: () => import("../view/axiosTwo")
    },
    {
      //当地址错误的时候就会跳转到这个页面
      path:"*",
      component:()=>import("../view/NotFind")
    },
    {
      path:"/",
      redirect:"/"
    }
  ]
})
