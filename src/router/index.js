import { createRouter, createWebHistory } from "vue-router";
import ProjectView from "../components/project_view.vue";
import Folder from "../components/item_folder.vue";
const routes = [
  {
    path: "/",
    name: "create",
    component: ProjectView,
  },
  {
    path: "/prj/:id",
    name: "ProjectView",
    component: ProjectView,
  },
  {
    path: "/test",
    name: "test",
    component: Folder,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
