import http from '../../src/axios';


const state = {
	notes: [],
};

const mutations = {
	addNotes(state, notes) {
		state.notes = [...notes]
	},
	updateNotes(state, updatedNote) {
		const noteIndex = state.notes.findIndex(note => note._id === updatedNote._id);
		if (noteIndex !== -1) {
			state.notes[noteIndex].title = updatedNote.title;
			state.notes[noteIndex].content = updatedNote.content;
		}
	},
	removeNote(state, removedNote) {
		const noteIndex = state.notes.findIndex(note => note._id === removedNote._id);
		if (noteIndex !== -1) {
			state.notes.splice(noteIndex, 1);
		}
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
				commit('updateNotes', updatedNote);
			})
			.catch(err => {
				console.log(err);
			});
	},
	removeNote({ commit }, removedNote) {
		http.delete(`/notes/${removedNote._id}`)
			.then(res => {
				commit('removeNote', removedNote);
			})
			.catch(err => {
				console.log(err);
			})
	}
};

export default {
	state,
	mutations,
	getters,
	actions
};
