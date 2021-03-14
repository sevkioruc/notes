import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import note from './modules/note';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		auth,
		note
	}
});

export default store;
