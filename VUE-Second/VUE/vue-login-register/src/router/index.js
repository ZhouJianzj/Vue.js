import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		redirect:'/login'
	},
	{
		path:'/login',
		component:Login,
		meta:{title:"登录"}
	},
	{
		path:'/register',
		component:Register,
		meta:{title:"注册"}
	}
	
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})     
         // 改变每一个使用history模式的路由跳转之后显示的网页标题
router.beforeEach(to,from,next){
	if(to.meta.title){
		document.title = to.meta.title
	}
}

export default router
