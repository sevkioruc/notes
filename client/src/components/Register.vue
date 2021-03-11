<template>
  <b-container fluid class="container">
    <b-form class="register-form" @submit="onSubmit">
      <b-form-group class="mb-3">
        <b-form-input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group class="mb-3">
        <b-form-input
          v-model="form.username"
          placeholder="Username"
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
          Register
        </b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.dispatch("register", { ...this.form }).then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
.register-form {
  margin-top: 100px;
}
</style>
