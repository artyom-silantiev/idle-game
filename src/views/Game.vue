<template>
  <nav v-if="advCount >= 0">
    <div class="nav nav-tabs" id="nav-tab" role="tablist">
      <button
        class="nav-link active"
        id="nav-home-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-home"
        type="button"
        role="tab"
        aria-controls="nav-home"
        aria-selected="true"
      >
        Base
      </button>
      <button
        class="nav-link"
        id="nav-profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-profile"
        type="button"
        role="tab"
        aria-controls="nav-profile"
        aria-selected="false"
      >
        Robot
      </button>
      <button
        class="nav-link"
        id="nav-contact-tab"
        data-bs-toggle="tab"
        data-bs-target="#nav-contact"
        type="button"
        role="tab"
        aria-controls="nav-contact"
        aria-selected="false"
      >
        ...
      </button>
    </div>
  </nav>
  <div class="tab-content" id="nav-tabContent">
    <div
      class="tab-pane fade show active"
      id="nav-home"
      role="tabpanel"
      aria-labelledby="nav-home-tab"
    >
      <IdleBase />
    </div>
    <div
      class="tab-pane fade"
      id="nav-profile"
      role="tabpanel"
      aria-labelledby="nav-profile-tab"
    >
      ...
    </div>
    <div
      class="tab-pane fade"
      id="nav-contact"
      role="tabpanel"
      aria-labelledby="nav-contact-tab"
    >
      ...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IdleBase from "../components/IdleBase.vue";

import { useGameStore } from "../stores/Game";
import { useIdleBaseStore } from "../stores/IdleBase";

export default defineComponent({
  components: {
    IdleBase,
  },
  setup() {
    const gameStore = useGameStore();
    const idleBaseStore = useIdleBaseStore();

    return {
      ...idleBaseStore,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
