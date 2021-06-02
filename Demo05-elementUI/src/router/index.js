import Vue from "vue"
import Router from "vue-router"




Vue.use(Router)
export default new Router({
  routes:[
    {
      path:"/dir",
      name:"dir",
      component: () =>import("@/view/Dir")
    },
    {
      path: "/login",
      name: "login",
      component: () =>import("@/view/Login")
    }
  ]
})
