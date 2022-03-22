import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Game from "../views/Game.vue";

const ideFix = 0 as number;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Game
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
