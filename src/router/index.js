import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import getall from '../views/getall.vue'
import Topbanana from '../views/Topbanana.vue'

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
			path:'/Topbanana',
			name:'可视化',
			component:Topbanana
		},
		{
			path:'/getall',
			name:'李碧拓的可视化',
			component:getall
		}
	]
  },
]

const router = new VueRouter({
  routes
})

export default router
