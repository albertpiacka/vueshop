// router
import Vue from 'vue'
import Router from 'vue-router'

// views
import Home from './views/Home.vue'
import About from './views/About.vue'
import Basket from './views/Basket.vue'
import Checkout from './views/Checkout.vue'
import Ordered from './views/Ordered.vue'

import SingleCoffee from './views/SingleCoffee.vue'
import SingleItem from './views/SingleItem.vue'

import Coffee from './views/Coffee.vue'
import Accessories from './views/Accessories.vue'

import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Home,
			meta: 'home'
		},
		{
			path: '/about',
			component: About
		},
		{
			path: '/coffee',
			component: Coffee
		},
		{
			path: '/accessories',
			component: Accessories
		},
		{
			path: '/accessories-:id',
			component: SingleItem,
			meta: 'back'
		},
		{
			path: '/coffee-:id',
			component: SingleCoffee,
			meta: 'back'
		},
		{
			path: '/basket',
			component: Basket,
			meta: 'back'
		},
		{
			path: '/checkout',
			component: Checkout,
			meta: 'back'
		},
		{
			path: '/ordered',
			component: Ordered,
			meta: 'ordered'
		},
		{
			path: '/*',
			component: NotFound,
		},
	]
})
