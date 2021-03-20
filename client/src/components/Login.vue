<template>
  <b-container fluid class="container">
    <b-form class="login-form" @submit="onSubmit">
      <b-form-group class="mb-3">
        <b-form-input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
        ></b-form-input>
      </b-form-group>

      <div class="d-flex">
        <b-button class="ml-auto" type="submit" variant="primary">
          Login
        </b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("login", { ...this.form }).then(() => {
        this.$store.dispatch("fetchNotes");
        this.$router.push("/notes");
      });
    },
  },
};
</script>

<style>
.container {
  text-align: center;
}
.login-form {
  margin-top: 100px;
}
</style>