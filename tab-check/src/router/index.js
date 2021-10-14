import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

import one from '../components/contentone.vue'
import two from '../components/contenttwo.vue'
import three from '../components/contentthree.vue'
const routes = [
  {
	  path:"/one",
	  component: one
  },
  {
  	  path:"/two",
  	  component: two
  },
  {
  	  path:"/three",
  	  component: three
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
