<template>
  <div>
    <h1>{{title}}</h1>
    <nav>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/heroes">Heroes</router-link>
    </nav>
    <router-view></router-view>
    <Messages></Messages>
  </div>
</template>

<script>
  import Messages from "@/components/Messages";

  export default {
    name: 'app',
    components: {Messages},
    data() {
      return {
        title: 'vue-tour-of-heroes'
      };
    }
  }
</script>

<style scoped>
  /* AppComponent's private CSS styles */
  h1 {
    font-size: 1.2em;
    margin-bottom: 0;
  }
  h2 {
    font-size: 2em;
    margin-top: 0;
    padding-top: 0;
  }
  nav a {
    padding: 5px 10px;
    text-decoration: none;
    margin-top: 10px;
    display: inline-block;
    background-color: #eee;
    border-radius: 4px;
  }
  nav a:visited, a:link {
    color: #334953;
  }
  nav a:hover {
    color: #039be5;
    background-color: #cfd8dc;
  }
  nav a.active {
    color: #039be5;
  }
</style>
