<template>
  <b-modal
    id="noteModal"
    no-close-on-backdrop
    size="lg"
    centered
    @ok="saveNote"
    @hide="clearModal"
  >
    <template #modal-footer="{ ok }">
      <b-button variant="danger" @click="ok()">{{ buttonText }}</b-button>
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
import EventBus from "../../event-bus";
export default {
  data() {
    return {
      note: {
        title: "",
        content: "",
      },
      buttonText: "Save",
    };
  },
  methods: {
    saveNote() {
      this.$store.dispatch("saveNote", this.note);
    },
    clearModal() {
      this.note = {};
      this.buttonText = "Save";
    },
  },
  created() {
    EventBus.$on("updatedNote", (data) => {
      this.note = data.note;
      this.buttonText = data.buttonText;
    });
  },
};
</script>

<style>
.note-area {
  height: 200px !important;
}
</style>
