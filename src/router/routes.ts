import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/shop",
    component: () => import("@layouts/MainLayout.vue"),
    meta: {
      private: true,
    },
    children: [
      {
        path: "",
        name: "home-shop",
        component: () => import("@pages/shop/Home.vue"),
      },
      {
        path: "profile",
        name: "profile-shop",
        component: () => import("@pages/shop/Account.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "home",
    meta: {
      public: true,
    },
    component: () => import("@pages/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@pages/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@pages/Register.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "error-404",
    meta: {
      public: true,
    },
    component: () => import("@pages/errors/404.vue"),
  },
];

export default routes;
