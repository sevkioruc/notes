import Vue from 'vue'
import Router from 'vue-router'
import Register from '../components/Register';
import Homepage from '../components/Homepage';
import Login from '../components/Login';
import Notes from '../components/Notes';
import store from '../../store';

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
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/notes',
			component: Notes,
			beforeEnter(to, from, next) {
				if (store.getters.isAuthenticated) {
					next();
				} else {
					next('/login');
				}
			}
		}
	]
})
