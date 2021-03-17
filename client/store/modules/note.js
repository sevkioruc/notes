import http from '../../src/axios';


const state = {
	notes: [],
};

const mutations = {
	addNotes(state, notes) {
		notes.forEach(note => {
			state.notes.push(note);
		})
	},
	updateNotes(state, note) {
		console.log(note);
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
				commit('addNotes', res.data);
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
	},
	updateNote({ commit }, updatedNote) {
		http.put(`/notes/${updatedNote._id}`, updatedNote)
			.then(res => {
				console.log(res.data);
				// commit('updateNote', res.data.note)
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
