import Vue from 'vue';
import VueBootstrap from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueBootstrap);

store.dispatch('auth/me').then(() => {
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
});
