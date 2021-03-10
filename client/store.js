import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: '',
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
		},
		clearToken(state) {
			state.token = '';
		}
	},
	actions: {
		register({ commit, dispatch, state }, authData) {
			const newUser = {
				email: authData.email,
				username: authData.username,
				password: authData.password,
			};

			return axios
				.post("http://localhost:3000/register", newUser)
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

			return axios.post("http://localhost:3000/login", user)
				.then((res) => {
					commit('setToken', res.data.token);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		logout({ commit, dispatch, state }) {
		}
	},
	getters: {
		isAuthenticated(state) {
			return state.token !== '';
		}
	}
});

export default store;
