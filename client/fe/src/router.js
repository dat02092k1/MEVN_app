import { createRouter, createWebHistory } from "vue-router";

import Mess from "./components/Mess.vue";
import ShowPost from "./components/ShowPost.vue";
import PostList from "./components/Pagination/PostList.vue";
import ListEmp from "./components/ListEmp.vue";
import Login from "./components/Login.vue";
import FileDoc from "./components/FileDoc.vue";
import Home from "./components/Home.vue";
import Form from "./components/Form.vue";
import Task from "./components/task/Task.vue";
import TaskList from "./components/task/TaskList.vue";
import ErrorPage from "./components/ErrorPage.vue";

const routes = [
  {
    path: "/mess",
    component: Mess,
    meta: { requiresAuth: true }, // this route requires authentication
  },
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: true }, // this route requires authentication
  },
  { path: "/post", component: ShowPost, meta: { requiresAuth: true } },
  { path: "/emp", component: ListEmp },
  { path: "/post/lists", component: PostList, meta: { requiresAuth: true } },
  { path: "/", component: Login, name: "login" },
  {
    path: "/file",
    component: FileDoc,
    meta: { requiresAuth: true },
  },
  {
    path: "/form",
    component: Form,
    meta: { requiresAuth: true },
  },
  {
    path: "/task",
    component: Task,
  },
  {
    path: "/task/list",
    component: TaskList,
  },
  { path: '/:pathMatch(.*)*', component: ErrorPage }, // wildcard route to catch any invalid routes  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem("role") !== null;
  const isAdmin = sessionStorage.getItem("role") === "admin";

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "login" });
    } else if (to.matched.some((route) => route.meta.requiresAdmin && !isAdmin)) {
      if (from.path) {
        next(from.path);
      } else {
        next("/");
      }
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
