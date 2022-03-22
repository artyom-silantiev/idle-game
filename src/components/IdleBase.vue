<template>
  <div class="idle-base">
    <div class="buyes-per-click">
      <button
        v-for="num in buesValues"
        :key="num"
        class="btn"
        :class="buyesPerClick === num ? 'btn-info' : 'btn-dark'"
        @click="buyesPerClick = num"
      >
        {{ num }}
      </button>
    </div>

    <div class="number">#{{ basePts.toFormat() }}</div>
    <div class="per-sec">#{{ basePtsPerSec.toFormat() }}/s</div>

    <div class="upgrades">
      <div class="upgrade" v-for="upg in baseUpgrades" :key="upg.name">
        <div>{{ upg.name }}</div>
        <div>LvL: {{ upg.level }}</div>
        <div>Val: {{ upg.value }}</div>
        <button class="btn btn-primary" @click="buyBaseUpgrade(upg)">
          #{{ upg.cost.toFormat() }}
        </button>
      </div>
    </div>

    <div class="upgrades" v-if="advCount > 0">
      <div class="upgrade" v-for="upg in advUpgrades" :key="upg.name">
        <div>{{ upg.name }}</div>
        <div>LvL: {{ upg.level }}</div>
        <div>Val: {{ upg.value }}</div>
        <button class="btn btn-warning" @click="buyAdvUpgrade(upg)">
          ${{ upg.cost.toFormat() }}
        </button>
      </div>
    </div>

    <div class="adv-reset">
      <div class="adv-pts">${{ advPts.toFormat() }}</div>
      <div class="adv-count">adv {{ advCount }}</div>
      <div>
        <button class="btn btn-warning" @click="advReset()">
          Convert #{{ advCost.toFormat() }} to ${{ advPlus.toFormat() }}
          and reset
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useIdleBaseStore } from "../stores/IdleBase";

export default defineComponent({
  setup() {
    const idleBaseStore = useIdleBaseStore();

    return {
      ...idleBaseStore,
    };
  },
});
</script>

<style lang="scss">
.idle-base {
  margin-top: 50px;
}

.buyes-per-click {
  text-align: center;
}

.number {
  font-size: 32px;
  text-align: center;
}
.per-sec {
  text-align: center;
}

.upgrades {
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: 10px auto;
  flex-wrap: wrap;

  .upgrade {
    width: 120px;
    margin-top: 10px;
    text-align: center;
    background-color: #eee;
  }
}

.adv-reset {
  margin-top: 20px;
  text-align: center;
  font-size: 32px;
  color: gold;

  .adv-count {
    font-size: 16px;
    color: gold;
  }
}
</style>