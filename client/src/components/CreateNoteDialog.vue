<template>
  <b-modal id="createNoteModal" size="lg" centered @ok="saveNote">
    <template #modal-footer="{ ok }">
      <b-button variant="danger" @click="ok()"> Save </b-button>
    </template>
    <b-col>
      <b-form-textarea
        class="note-area"
        placeholder="Enter Note"
        v-model="note"
      ></b-form-textarea>
    </b-col>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      note: "",
    };
  },
  methods: {
    // TODO
    saveNote() {},
  },
};
</script>

<style>
.note-area {
  height: 200px !important;
}
</style>