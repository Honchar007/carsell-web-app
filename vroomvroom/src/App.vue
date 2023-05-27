<template>
  <router-view/>
</template>

<script lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Actions } from './store/props';

export default {
  name: 'App',

  components: {
  },

  setup() {
    const store = useStore();

    const isLoading = computed(() => store.getters.isLoading);

    onMounted(() => {
      store.dispatch(Actions.updateFromLocalStorage);
    });

    return {
      isLoading,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: radial-gradient(100% 100% at 0% 0%, rgba(21, 19, 180, 0.927) 0%, rgba(187, 50, 50, 0) 100%);
}

html {
  background-attachment: fixed;
}

body {
  margin: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
