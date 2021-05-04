import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import apiClient from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: [],
    isLogged: false,
    isLoggedLoading: false,
    loadedUrls: null,
    isUrlsLoading: false,
    isUrlsSuccess: false,
    redirectUrl: null,
    isRedirectUrlLoading: false,
    isRedirectUrlGetting: false,
  },

  getters: {
    errors: (state) => state.errors,
    isLogged: (state) => state.isLogged,
    loadedUrls: (state) => state.loadedUrls,
    isUrlsSuccess: (state) => state.isUrlsSuccess,
  },

  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    },
    // Loging in
    SET_LOGGED_STATUS(state, status) {
      state.isLogged = status;
    },
    SET_LOGGED_LOADING(state, status) {
      state.isLoggedLoading = status;
    },
    // MyLinks
    SET_URLS_STATUS(state, status) {
      state.isUrlsSuccess = status;
    },
    SET_URLS_LOADING(state, status) {
      state.isUrlsLoading = status;
    },
    SET_USER_URLS(state, urls) {
      state.loadedUrls = urls;
    },
    // Create Redirecing
    SET_REDIRECT_URL(state, url) {
      state.redirectUrl = url;
    },
    SET_REDIRECT_STATUS(state, status) {
      state.isRedirectUrlLoading = status;
    },
    // Do Redirect
    SET_GETTING_REDIRECT_STATUS(state, status) {
      state.isRedirectUrlGetting = status;
    },
  },

  actions: {
    getUsersUrls({ commit }) {
      commit('SET_URLS_LOADING', true);
      commit('SET_URLS_STATUS', false);
      return apiClient
        .get('/api/urls')
        .then((response) => {
          console.log('[SUCCESS] getUsersUrls: get(/api/urls)');
          commit('SET_USER_URLS', response.data);
          commit('SET_URLS_STATUS', true);
        })
        .catch((error) => {
          console.log('[ERROR] getUsersUrls: get(/api/urls)', error.response.data);
          commit('setErrors', error.response.data);
        })
        .finally(() => {
          commit('SET_URLS_LOADING', false);
        });
    },
    async getRedirectUrl({ commit }, data) {
      commit('SET_GETTING_REDIRECT_STATUS', true);
      await apiClient
        .get(`/api/redirect-url?short=${data.redirect}`)
        .then((response) => {
          console.log('[SUCCESS] getRedirectUrl: get(/api/redirect-url/)', response.data);
          commit('SET_REDIRECT_URL', response.data);
          // commit("SET_REDIRECT_STATUS", true);
        })
        .catch((error) => {
          console.log('[ERROR] getRedirectUrl: get(/api/redirect-url/)', error.response.data);
          commit('setErrors', error.response.data);
        })
        .finally(() => {
          commit('SET_GETTING_REDIRECT_STATUS', false);
        });
    },
    createNewUrl({ commit }, data) {
      commit('SET_REDIRECT_STATUS', true);
      return apiClient
        .post('/api/redirect-url', data)
        .then((response) => {
          console.log('[SUCCESS] createNewUrl: post(/api/redirect-url/)', response.data);
        })
        .catch((error) => {
          console.log('[ERROR] createNewUrl: post(/api/redirect-url/)', error.response.data);
          commit('setErrors', error.response.data);
        })
        .finally(() => {
          commit('SET_REDIRECT_STATUS', false);
        });
    },
    deleteUrl({ dispatch }, data) {
      return apiClient
        .delete(`/api/redirect-url/${data}`)
        .then((response) => {
          console.log('[SUCCESS] deleteUrl: delete(/api/redirect-url)', response.data);
          dispatch('getUsersUrls');
        })
        .catch((error) => {
          console.log('[ERROR] deleteUrl: delete(/api/redirect-url)', error.response.data);
        });
    },
  },

  modules: {
    auth,
  },
});
