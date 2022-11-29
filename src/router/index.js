import { createRouter, createWebHistory } from "vue-router";
import ProjectView from "../components/project_view.vue";
import Folder from "../components/item_folder.vue";
import ProjectLink from "../components/unique_project_link.vue";
import HomePage from "../components/homepage.vue";
const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/prj/:id",
    name: "ProjectView",
    component: ProjectView,
  },
  {
    path: "/project_link/:id",
    name: "project_link",
    component: ProjectLink,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
