import { useIdleBaseStore } from './IdleBase';

const fix = 0 as number;

function setupGameStore() {
  const idleBaseStore = useIdleBaseStore();

  function start() {
    idleBaseStore.updatePerSec();
    setInterval(() => {
      idleBaseStore.tick();
    }, 1000);
  }

  return {
    start
  };
}

let gameStore: ReturnType<typeof setupGameStore>;
export function useGameStore() {
  if (!gameStore) {
    gameStore = setupGameStore();
  }
  return gameStore;
}
