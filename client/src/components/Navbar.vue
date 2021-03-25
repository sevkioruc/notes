<template>
  <b-navbar toggleable="lg" type="dark" class="navbar">
    <b-navbar-nav>
      <b-nav-item to="/notes">Notes</b-nav-item>
    </b-navbar-nav>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item to="/login" class="login" :class="loginAndRegisterClass"
            >Login</b-nav-item
          >
          <b-nav-item to="/register" :class="loginAndRegisterClass"
            >Register</b-nav-item
          >
          <b-nav-item :class="logoutClass" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    loginAndRegisterClass() {
      return {
        "d-none": this.$store.getters.isAuthenticated,
      };
    },
    logoutClass() {
      return {
        "d-none": !this.$store.getters.isAuthenticated,
      };
    },
    variant() {
      return {
        "background-color": "#563d7c",
      };
    },
  },
};
</script>

<style>
.navbar {
  background-color: #6f42c1 !important;
}
a {
  color: white !important;
  font-size: 18px !important;
}
</style>