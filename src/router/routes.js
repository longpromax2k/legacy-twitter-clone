const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/PageLogin.vue"),
        name: "👋 ĐĂNG NHẬP",
      },
      {
        path: "/join",
        component: () => import("src/pages/PageJoin.vue"),
        name: "🥳 ĐĂNG KÝ",
      },
    ],
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/PageHome.vue"),
        name: "🏠 NHÀ",
      },
      {
        path: "/about",
        component: () => import("src/pages/PageAbout.vue"),
        name: "😀 THÔNG TIN",
      },
      {
        path: "/people",
        component: () => import("src/pages/PagePeople.vue"),
        name: "👥 MỌI NGƯỜI",
      },
      {
        path: "/search",
        component: () => import("src/pages/PageSearch.vue"),
        name: "🔍 TÌM KIẾM",
      },
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
