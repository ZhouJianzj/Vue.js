import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import page1 from "@/components/page1";
import page2 from "@/components/page2";
import one from "../components/one";
import two from "../components/two";


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
    }
  ]
})
