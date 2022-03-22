<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useGameStore } from "./stores/Game";
import { useIdleBaseStore } from "./stores/IdleBase";

export default defineComponent({
  setup() {
    const gameStore = useGameStore();
    const idleBaseStore = useIdleBaseStore();

    onMounted(() => {
      gameStore.start();
    });
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
