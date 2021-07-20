import Vue from "vue"
import vueRouter from "vue-router"
import Content from "../components/Content"
import Txt from  "../components/Text"
//使用router
Vue.use(vueRouter)
//声明暴露的路由配置文件
export default  new vueRouter({
  //配置路由
  routes:[
    //配置组件对应的pathc
    {
      path:"/content",
      name:"Content",
      component:Content
    },
    //配置组件对应的path
    {
      path: "/text",
      name: "Txt",
      component: Txt
    }

  ]
})
