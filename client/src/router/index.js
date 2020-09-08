import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';
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
    meta: {
      requiresLogin: true
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Create.vue")
  },
  {
    path: "/my-links",
    name: "MyLinks",
    meta: {
      requiresLogin: true
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/My-Links.vue")
  },
  {
    path: "/:redirect",
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

router.beforeEach((to, from, next) => {
  console.log('[INFO] router: to: ', to, 'from: ', from, 'next: ', next);
  if (to.matched.some(record => record.meta.requiresLogin) && store.state.isLogged == false) {
    console.log('[INFO] router.js: You need to log in before you can perform this action.');
    store.commit("setErrors", "You need to log in before you can perform this action.")
    next("/login")
} else {
  console.log('[INFO] router.js: OK');
    next()
}
});

export default router;
