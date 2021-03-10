<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-nav>
      <b-nav-item to="/notes">Notes</b-nav-item>
    </b-navbar-nav>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/register">Register</b-nav-item>
          <b-nav-item :class="logoutClass">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout() {},
  },
  computed: {
    logoutClass() {
      return {
        "d-none": false,
      };
    },
  },
};
</script>

<style>
</style>