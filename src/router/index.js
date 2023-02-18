import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import getall from '../views/GetAll.vue'
import show from '../views/Show.vue'

Vue.use(VueRouter)
//const game = require('../../public/game.html')

const routes = [
  {
    path: '/',
	redirect:'/getall',
    name: 'home',
    component: HomeView,
	children:[
		{
			path:'/show',
			name:'show',
			component:show
		},
		{
			path:'/getall',
			name:'getall',
			component:getall
		}
	]
  },
]

const router = new VueRouter({
  routes
})

export default router
