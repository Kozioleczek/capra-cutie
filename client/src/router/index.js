import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue'),
  },
  {
    path: '/create',
    name: 'Create',
    meta: {
      requiresLogin: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Create.vue'),
  },
  {
    path: '/my-links',
    name: 'MyLinks',
    meta: {
      requiresLogin: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/My-Links.vue'),
  },
  {
    path: '/:redirect',
    props: true,
    name: 'Redirect',
    beforeEnter: (to, from, next) => {
      console.log('[INFO] router.js: /:redirect', to.params.redirect);
      store.dispatch('getRedirectUrl', { redirect: to.params.redirect }).then(() => {
        next();
      });
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Redirect.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('[INFO] router: to: ', to, 'from: ', from, 'next: ', next);
  if (to.matched.some((record) => record.meta.requiresLogin) && store.state.isLogged === false) {
    console.log('[INFO] router.js: You need to log in before you can perform this action.');
    store.commit('setErrors', 'You need to log in before you can perform this action.');
    next('/login');
  } else {
    console.log('[INFO] router.js: OK');
    next();
  }
});

export default router;
