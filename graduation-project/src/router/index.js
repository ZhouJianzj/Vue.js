import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../components/login";
import home from "../components/home";
Vue.use(VueRouter)

const routes = [
  //  path事字符串，组件不是
  {
    path: "/sys/login",
    component: login
  },
  {
    path: "/home",
    component: home
  }
]

const router = new VueRouter({
  routes
})
//路由守卫，防止恶意跳转
router.beforeEach((to,from,next)=>{
  if (to.path === '/sys/login') return next()
  const token = window.sessionStorage.getItem("token");
  if (!token) return next('/sys/login')
  next();
})
export default router
