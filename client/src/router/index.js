import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// const guest = (to, from, next) => {
//   if (!localStorage.getItem("authToken")) {
//     return next();
//   } else {
//     return next("/");
//   }
// };
// const auth = (to, from, next) => {
//   if (localStorage.getItem("authToken")) {
//     return next();
//   } else {
//     return next("/login");
//   }
// };

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Auth/Login.vue")
  },
  {
    path: "/create",
    name: "Create",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Create.vue")
  },
  {
    path: "/my-links",
    name: "MyLinks",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/My-Links.vue")
  },
  {
    path: "/:url",
    props: true,
    name: "Redirect",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Redirect.vue")
  },
  // {
  //   path: "/register",
  //   name: "Register",
  //   beforeEnter: guest,
  //   component: () =>
  //     import(/* webpackChunkName: "register" */ "../views/Auth/Register.vue")
  // },
  // {
  //   path: "/verify/:hash",
  //   name: "Verify",
  //   beforeEnter: auth,
  //   props: true,
  //   component: () =>
  //     import(/* webpackChunkName: "verify" */ "../views/Auth/Verify.vue")
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
