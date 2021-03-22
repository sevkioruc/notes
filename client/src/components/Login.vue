<template>
  <b-col class="container">
    <b-row class="form-wrapper" align-h="center" align-v="center">
      <b-form class="login-form" @submit="onSubmit">
        <b-form-group class="mb-3">
          <b-form-input
            class="mb-1 mt-3"
            v-model="form.email"
            type="email"
            placeholder="Email"
            size="lg"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-input
            class="mb-2"
            v-model="form.password"
            type="password"
            placeholder="Password"
            size="lg"
            required
          ></b-form-input>
        </b-form-group>

        <div class="d-flex mb-2">
          <b-button class="ml-auto" type="submit" size="lg" variant="primary">
            Login
          </b-button>
        </div>
      </b-form>
    </b-row>
  </b-col>
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
        this.$router.push("/notes");
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  background: linear-gradient(#e66465, #9198e5);
}
.form-wrapper {
  height: 100%;
}
.login-form {
  border: 1px solid lightgrey;
  padding: 15px;
  border-radius: 10px;
  background-color: white;
}
</style>