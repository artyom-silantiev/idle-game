import { ref, Ref } from "vue";
import { Decimal } from "decimal.js";
import { Robot } from "../types/robot/Robot";

const ideFix = 0 as number;

function setupIdleRobotStore() {
  const scrap = ref(new Decimal("0"));

  return {};
}

let idleRobotStore: ReturnType<typeof setupIdleRobotStore>;
export function useIdleRobotStore() {
  if (!idleRobotStore) {
    idleRobotStore = setupIdleRobotStore();
  }
  return idleRobotStore;
}
