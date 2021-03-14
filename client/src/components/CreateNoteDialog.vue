<template>
  <b-modal id="createNoteModal" size="lg" centered @ok="saveNote">
    <template #modal-footer="{ ok }">
      <b-button variant="danger" @click="ok()"> Save </b-button>
    </template>
    <b-col>
      <b-row class="mb-3">
        <b-input placeholder="Title" v-model="note.title"></b-input>
      </b-row>
      <b-row>
        <b-form-textarea
          class="note-area"
          placeholder="Content"
          v-model="note.content"
        ></b-form-textarea>
      </b-row>
    </b-col>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      note: {
        title: "",
        content: "",
      },
    };
  },
  methods: {
    saveNote() {
      this.$store.dispatch("saveNote", this.note);
    },
  },
};
</script>

<style>
.note-area {
  height: 200px !important;
}
</style>
