import apiClient from '../services/api';

export default {
  namespaced: true,

  state: {
    userData: null,
  },

  getters: {
    user: (state) => state.userData,
  },

  mutations: {
    SET_USER_DATA(state, user) {
      state.userData = user;
    },
  },

  actions: {
    async sendLoginRequest({ commit, dispatch }, data) {
      console.log('[INFO] sendLoginRequest: get(/sanctum/csrf-cookie)');
      commit('SET_LOGGED_LOADING', true, { root: true });
      // Get CSRF Cookie
      await apiClient
        .get('/sanctum/csrf-cookie')
        .then(() => {
          console.log('[SUCCESS] sendLoginRequest: get(/sanctum/csrf-cookie)');
        })
        .catch((error) => {
          console.log('[ERROR] sendLoginRequest: get(/sanctum/csrf-cookie)', error.response.data);
          commit('setErrors', error.response.data, { root: true });
        });

      // Login to user account
      console.log('[INFO] sendLoginRequest: post(/login)');
      await apiClient
        .post('/login', data)
        .then(() => {
          console.log('[SUCCESS] sendLoginRequest: post(/login)');
        })
        .catch((error) => {
          console.log('[ERROR] sendLoginRequest: post(/login)', error.response.data);
          commit('setErrors', error.response.data, { root: true });
        })
        .finally(() => {
          commit('SET_LOGGED_LOADING', false, { root: true });
        });

      // Call set local auth data
      return dispatch('me');
    },
    async logoutUser({ commit, dispatch }) {
      await apiClient
        .post('/logout')
        .then((response) => {
          console.log('[SUCCESS] logoutUser: post(/logout)', response.data);
        })
        .catch((error) => {
          console.log('[ERROR] logoutUser: post(/logout)', error.response.data);
          commit('setErrors', error.response.data, { root: true });
        });
      return dispatch('me');
    },
    me({ commit }) {
      console.log('[INFO] me: Getting data');
      return apiClient
        .get('/api/user')
        .then((response) => {
          console.log('[SUCCESS] me: get(api/user):');
          commit('SET_LOGGED_STATUS', true, { root: true });
          commit('SET_USER_DATA', response.data);
        })
        .catch((error) => {
          console.log('[ERROR] me: get(api/user):', error.response.data);
          commit('SET_LOGGED_STATUS', false, { root: true });
          commit('SET_USER_DATA', null);
        });
    },
  },
};
