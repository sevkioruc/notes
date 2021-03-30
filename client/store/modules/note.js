import http from '../../src/axios';


const state = {
	notes: [],
};

const mutations = {
	getNotes(state, notes) {
		notes.map(note => note.isSelected = false);
		state.notes = [...notes]
	},
	updateNote(state, updatedNote) {
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
	},
	addNote(state, note) {
		state.notes.push(note);
	},
	removeNotes(state, removedNotes) {

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
				commit('getNotes', res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	},
	saveNote({ commit }, note) {
		http.post('/notes', note)
			.then(res => {
				commit('addNote', res.data)
			})
			.catch(err => {
				console.log(err);
			});
	},
	updateNote({ commit }, updatedNote) {
		http.put(`/notes/${updatedNote._id}`, updatedNote)
			.then(res => {
				commit('updateNote', updatedNote);
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
	},
	removeNotes({ commit }, removedNotes) {
		http.delete('/selectedNotes', { data: { selectedNotes: removedNotes } })
			.then(res => {
				console.log(res);
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
