import Vue from "vue"
import vueRouter from "vue-router"
import Content from "../components/Content"
import text from  "../components/text"
//使用router
Vue.use(vueRouter)
//声明暴露的路由配置文件
export default  new vueRouter({
  //配置路由
  routes:[
    //配置组件对应的path
    {
      path:"/Content",
      name:"Content",
      component:Content
    },
    //配置组件对应的path
    {
      path: "/text",
      name: "text",
      component: text
    }

  ]
})
