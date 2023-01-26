import { verifyToken, verifyProfile, authUser } from "@middlewares/one";
import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/user",
    components: { auth: () => import("@layouts/MainLayout.vue") },
    meta: {
      private: true,
    },
    children: [
      {
        path: ":id",
        name: "profile-user",
        beforeEnter: [verifyProfile, authUser],
        component: () => import("@pages/user/Profile.vue"),
      },
    ],
  },
  {
    path: "/",
    components: {
      default: () => import("@layouts/PublicLayout.vue"),
      auth: () => import("@layouts/MainLayout.vue"),
    },
    children: [
      {
        path: "",
        name: "home",
        meta: {
          protected: true,
          layout: "auth",
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
    ],
  },
  {
    path: "/active-email/:token",
    name: "active-email",
    meta: {
      public: true,
    },
    beforeEnter: [verifyToken],
    component: () => import("@pages/Active.vue"),
  },
  {
    path: "/reset-password/:token",
    name: "forgot",
    meta: {
      public: true,
    },
    beforeEnter: [verifyToken],
    component: () => import("@pages/Forgot.vue"),
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
