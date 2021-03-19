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
      <b-button v-if="!isFromUptade" variant="danger" @click="ok()"
        >Save</b-button
      >
      <b-button v-if="isFromUptade" variant="info" @click="updateNote"
        >Update</b-button
      >
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
      isFromUptade: false,
    };
  },
  methods: {
    saveNote() {
      this.$store.dispatch("saveNote", this.note);
    },
    clearModal() {
      this.note = {};
      this.isFromUptade = false;
    },
    updateNote() {
      this.$store.dispatch("updateNote", this.note);
    },
  },
  created() {
    EventBus.$on("updatedNote", (data) => {
      this.note = { ...data.note };
      this.isFromUptade = data.fromUpdate;
    });
  },
};
</script>

<style>
.note-area {
  height: 200px !important;
}
</style>
