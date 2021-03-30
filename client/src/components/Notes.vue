<template>
  <b-container fluid>
    <b-col>
      <b-row class="mt-3" align-h="end">
        <b-button v-b-modal.noteModal class="create">Create</b-button>
        <CreateNoteDialog />
      </b-row>
      <b-row class="mt-3">
        <b-col class="col-2" v-for="note in getNotes" :key="note.id">
          <b-card
            :border-variant="note.isSelected ? 'danger' : 'primary'"
            class="note-wrapper mb-3"
          >
            <b-card-header
              class="text-center border-1 note-header"
              @click="toggleNote(note)"
            >
              <span>{{ note.title }}</span>
            </b-card-header>
            <b-row class="mt-3 content">
              {{ note.content }}
            </b-row>
            <b-row class="button-wrapper">
              <b-button
                class="mr-2 detail-button"
                variant="warning"
                v-b-modal.noteModal
                @click="updateNote(note)"
                >Detail</b-button
              >
              <b-button
                class="remove-button"
                variant="danger"
                @click="removeNote(note)"
                >Remove
              </b-button>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import CreateNoteDialog from "./CreateNoteDialog";
import { mapGetters } from "vuex";
import EventBus from "../../event-bus";

export default {
  data() {
    return {
      selectedNotes: [],
    };
  },
  components: {
    CreateNoteDialog,
  },
  computed: {
    ...mapGetters(["getNotes"]),
  },
  methods: {
    updateNote(note) {
      EventBus.$emit("updatedNote", { note: note, fromUpdate: true });
    },
    removeNote(note) {
      this.$store.dispatch("removeNote", note);
    },
    toggleNote(note) {
      if (!note.isSelected) {
        note.isSelected = true;
        this.selectedNotes.push(note);
      } else {
        note.isSelected = false;
        const index = this.selectedNotes.findIndex((n) => n._id === note._id);
        if (index !== -1) {
          this.selectedNotes.splice(index, 1);
        }
      }
    },
  },
  created() {
    this.$store.dispatch("fetchNotes");
  },
};
</script>

<style>
.card-header {
  background-color: #fff;
}
.note-header {
  cursor: pointer;
}
.note-wrapper {
  min-height: 400px;
  position: relative;
}
.line {
  border-top: 1px solid lightgrey;
}
.button-wrapper {
  position: absolute;
  right: 30px;
  bottom: 10px;
}
.edit-button {
  width: 85px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
</style>
