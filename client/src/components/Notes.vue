<template>
  <b-container fluid>
    <b-col>
      <b-row class="mt-3" align-h="end">
        <b-button v-b-modal.noteModal>Create</b-button>
        <CreateNoteDialog />
      </b-row>
      <b-row class="mt-3">
        <b-col class="col-2" v-for="note in getNotes" :key="note.id">
          <b-card
            border-variant="primary"
            :header="note.title"
            header-border-variant="secondary"
            class="text-center note-wrapper"
          >
            <b-row class="mt-3">
              {{ note.content }}
            </b-row>
            <b-row class="button-wrapper">
              <b-button
                class="mr-2 edit-button"
                variant="warning"
                v-b-modal.noteModal
                @click="updateNote(note)"
                >Detail</b-button
              >
              <b-button variant="danger">Remove</b-button>
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
  },
};
</script>

<style>
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
