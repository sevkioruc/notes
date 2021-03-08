import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Register';
import Homepage from '../components/Homepage';

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Homepage
		},
		{
			path: '/register',
			component: Register
		}
	]
})
