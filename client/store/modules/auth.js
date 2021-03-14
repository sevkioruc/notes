import http from '../../src/axios';
import router from '../../src/router/index';


const state = {
	token: ''
};

const mutations = {
	setToken(state, token) {
		state.token = token;
	},
	clearToken(state) {
		state.token = '';
	}
};

const getters = {
	isAuthenticated(state) {
		return state.token !== '';
	}
};

const actions = {
	initAuth({ commit, dispatch }) {
		let token = localStorage.getItem('token');
		if (token) {
			let expirationDate = localStorage.getItem('expirationDate');
			let time = new Date().getTime();

			if (time > +expirationDate) {
				dispatch('logout');
			} else {
				commit('setToken', token);
				let timerSecond = +expirationDate - time;
				dispatch('setTimeoutTimer', timerSecond);
				router.push('/');
			}

		} else {
			router.push('/login');
			return false;
		}
	},
	register({ commit, dispatch, state }, authData) {
		const newUser = {
			email: authData.email,
			username: authData.username,
			password: authData.password,
		};

		return http.post('/register', newUser)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	login({ commit, dispatch, state }, authData) {
		const user = {
			email: authData.email,
			password: authData.password,
		};

		return http.post('/login', user)
			.then((res) => {
				commit('setToken', res.data.token);
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('expirationDate', new Date().getTime() + res.data.expiresIn * 1000);
				dispatch('setTimeoutTimer', +res.data.expiresIn * 1000);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	logout({ commit, dispatch, state }) {
		commit('clearToken');
		localStorage.removeItem('token');
		localStorage.removeItem('expirationDate');
		router.replace('/');
	},
	setTimeoutTimer({ dispatch }, expiresIn) {
		setTimeout(() => {
			dispatch('logout');
		}, expiresIn);
	}
};

export default {
	state,
	mutations,
	getters,
	actions
};
