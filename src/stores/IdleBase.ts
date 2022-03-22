import { ref, Ref } from 'vue';
import { Decimal } from 'decimal.js';

const fix = 0 as number;

class BaseUpgrade {
  name: string;
  level: number;
  value: Decimal;
  valueUp: Decimal;
  cost: Decimal;
  costUpMul: Decimal;

  constructor(
    name: string,
    value: string,
    valueUp: string,
    cost: string,
    costUpMul: string
  ) {
    this.name = name;
    this.level = 0;
    this.value = new Decimal(value);
    this.valueUp = new Decimal(valueUp);
    this.cost = new Decimal(cost);
    this.costUpMul = new Decimal(costUpMul);
  }
}

function createBaseUpgrades() {
  return [
    new BaseUpgrade('Base', '1', '1', '10', '1.1'),
    new BaseUpgrade('Mul 1', '1', '0.4', '1e2', '1.1'),
    new BaseUpgrade('Mul 2', '1', '0.3', '1e4', '1.1'),
    new BaseUpgrade('Mul 3', '1', '0.2', '1e5', '1.1'),
    new BaseUpgrade('Mul 4', '1', '0.1', '1e7', '1.1')
  ];
}

function createAdvUpgrades() {
  return [
    new BaseUpgrade('Adv 1', '1', '0.2', '10', '1.1'),
    new BaseUpgrade('Adv 2', '1', '0.2', '1e3', '1.1'),
    new BaseUpgrade('Adv 3', '1', '0.2', '1e6', '1.1'),
    new BaseUpgrade('Adv 4', '1', '0.2', '1e12', '1.1'),
    new BaseUpgrade('Adv 5', '1', '0.2', '1e21', '1.1')
  ];
}

function setupIdleBaseStore() {
  const buyesPerClick = ref(1);
  const buesValues = ref([1, 5, 10, 25, 100]);

  const basePts = ref(new Decimal('0')) as Ref<Decimal>;
  const basePtsPerSec = ref(new Decimal('0')) as Ref<Decimal>;
  const baseUpgrades = ref(createBaseUpgrades()) as Ref<BaseUpgrade[]>;

  const advCount = ref(0);
  const advCost = ref(new Decimal('1e8')) as Ref<Decimal>;
  const advPlus = ref(new Decimal('10')) as Ref<Decimal>;
  const advPts = ref(new Decimal('0')) as Ref<Decimal>;
  const advUpgrades = ref(createAdvUpgrades()) as Ref<BaseUpgrade[]>;

  function tick() {
    basePts.value = basePts.value.plus(basePtsPerSec.value);
    if (basePts.value.gt('1e8')) {
      advCost.value = basePts.value;
      advPlus.value = basePts.value.div('1e7').round();
    }
  }

  function updatePerSec() {
    let basePerSec = new Decimal('0');
    for (let i = 0; i < baseUpgrades.value.length; i++) {
      const upg = baseUpgrades.value[i];

      if (i === 0) {
        basePerSec = new Decimal(upg.value);
      } else {
        basePerSec = basePerSec.times(upg.value).round();
      }
    }
    for (let i = 0; i < advUpgrades.value.length; i++) {
      const upg = advUpgrades.value[i];
      basePerSec = basePerSec.times(upg.value).round();
    }

    basePtsPerSec.value = basePerSec;
  }

  function buyBaseUpgrade(upg: BaseUpgrade) {
    let num = 0;
    while (num < buyesPerClick.value && basePts.value.gte(upg.cost)) {
      basePts.value = basePts.value.minus(upg.cost);
      upg.cost = upg.cost.times(upg.costUpMul).round();
      upg.value = upg.value.plus(upg.valueUp);
      upg.level++;
      num++;
    }
    if (num > 0) {
      updatePerSec();
    }
  }

  function buyAdvUpgrade(upg: BaseUpgrade) {
    let num = 0;
    while (num < buyesPerClick.value && advPts.value.gte(upg.cost)) {
      advPts.value = advPts.value.minus(upg.cost);
      upg.cost = upg.cost.times(upg.costUpMul).round();
      upg.value = upg.value.plus(upg.valueUp);
      upg.level++;
      num++;
    }
    if (num > 0) {
      updatePerSec();
    }
  }

  function advReset() {
    if (basePts.value.gte(advCost.value)) {
      advCost.value = new Decimal('1e10');
      advPts.value = advPts.value.plus(advPlus.value);
      basePts.value = new Decimal(0);
      baseUpgrades.value = createBaseUpgrades();
      advCount.value++;
      advPlus.value = new Decimal('10');
      updatePerSec();
    }
  }

  return {
    buyesPerClick,
    buesValues,

    basePts,
    basePtsPerSec,
    baseUpgrades,

    advCount,
    advCost,
    advPlus,
    advPts,
    advUpgrades,

    tick,
    updatePerSec,

    buyBaseUpgrade,
    buyAdvUpgrade,
    advReset
  };
}

let idleBaseStore: ReturnType<typeof setupIdleBaseStore>;
export function useIdleBaseStore() {
  if (!idleBaseStore) {
    idleBaseStore = setupIdleBaseStore();
  }
  return idleBaseStore;
}
