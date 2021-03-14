import http from '../../src/axios';


const state = {
	notes: [],
};

const mutations = {
	setNotes(state, notes) {
		state.notes = notes;
	}
};

const getters = {
	getNotes(state) {
		return state.notes;
	}
};

const actions = {
	fetchNotes({ commit }) {
		http.get('/notes')
			.then((res) => {
				commit('setNotes', res.data.notes);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

export default {
	state,
	mutations,
	getters,
	actions
};
