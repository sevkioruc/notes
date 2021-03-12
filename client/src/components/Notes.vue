<template>
  <b-container fluid>
    <b-col>
      <b-row class="mt-3" align-h="end">
        <b-button v-b-modal.createNoteModal>Create</b-button>
        <CreateNoteDialog />
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import CreateNoteDialog from "./CreateNoteDialog";
export default {
  components: {
    CreateNoteDialog,
  },
};
</script>

<style>
</style>
