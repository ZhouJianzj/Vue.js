import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import page1 from "@/components/page1";
import page2 from "@/components/page2";
import one from "../components/one";
import two from "../components/two";
import parent from "../components/parent";
import childrenOne from "../components/childrenOne"
import query from "../components/query"
import params from "../components/params"
import routeNameParams from "../components/route-name-params"
import routerNameQuery from "../components/route-name-query"

Vue.use(Router)

export default new Router({
  // 默认的是hash模式的，使用#号的，指定history模式是没有#的号的
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {path:"/page1",component:page1},

    {
      path:"/page2",
      component:page2
    },
    {
      path:"/one",
      component:one
    },
    {
      path:"/two",
      component:two
    },
    {
      path:"/parent",
      component:parent,
//  嵌套的路由需要是由children的属性，然而单页面的嵌套路由需要使用child
      children:[
        {
          path:"/childrenOne",
          component:childrenOne
        }
      ]
    },

    {
      path:"/query",
      component:query
    },

    {
      // 使用params的形式传递参数，只需要在to的地址以 /prams/zhoujian
      path:"/params/:name",
      component:params
    },
    {
      path:"/routeNameParams/:name",
      name:"routeNameParams",
      component:routeNameParams
    },
    {
      path:"/routerNameQuery",
      name:"routerNameQuery",
      component:routerNameQuery
    }
  ]
})
