const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "",
      component: () => import("src/pages/PageHome.vue"),
      name: "🏠 NHÀ" },
      { path: "/about",
      component: () => import("src/pages/PageAbout.vue"),
      name: "😀 THÔNG TIN"},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
