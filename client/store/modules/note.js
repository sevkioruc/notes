import http from '../../src/axios';


const state = {
	notes: [],
};

const mutations = {
	addNotes(state, notes) {
		state.notes.push(notes);
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
	},
	saveNote({ commit }, note) {
		http.post('/notes', note)
			.then(res => {
				commit('addNotes', res.data)
			})
			.catch(err => {
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
