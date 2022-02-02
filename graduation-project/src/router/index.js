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
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},

  {path: "/login",component: login},
  {path: "/home",component: home,redirect:'/welcome',
    children:[
      {path: '/welcome',component: welcome},
      {path: '/user', component: user },
      {path: '/dep', component: dep },
      {path: '/role', component: role },
      {path: '/perm', component: perm },
      {path: '/log', component: log },
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
