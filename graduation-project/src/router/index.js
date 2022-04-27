import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../components/login";
import home from "../components/home";
import welcome from "../components/welcome";

import dep from "../components/sys/dep";
import log from "../components/sys/log";
import perm from "../components/sys/perm";
import role from "../components/sys/role";
import user from "../components/sys/user";
import client from "../components/remote-control/client";
import device from "../components/remote-control/device";
import lockService from "../components/remote-control/lock-service"
import history from "../components/video-monitor/history";
import monitor from "../components/video-monitor/monitor";
import topicView from "../components/remote-control/topicView";
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},

  {path: "/login",component: login},

  {path: "/home",component: home,
    redirect:'/welcome',
    children:[
      {path: '/welcome',component: welcome},
      {path: '/user', component: user },
      {path: '/dep', component: dep },
      {path: '/role', component: role },
      {path: '/perm', component: perm },
      {path: '/log', component: log },
      {path: '/client', component: client },
      {path: '/device', component: device },
      {path: '/lockService', component: lockService },

      {path: '/history', component: history },
      {path: '/monitor', component: monitor },
      {path: '/topic', component: topicView },
    ]
  }

]

const router = new VueRouter({
  routes
})
//路由守卫，防止恶意跳转
router.beforeEach((to,from,next)=>{
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem("token");
  if (!token) return next('/login')
  next();
})
export default router
