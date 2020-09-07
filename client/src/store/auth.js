import apiClient from '../services/api';

export default {
  namespaced: true,

  state: {
    // userCreditials: {
    //   email: '',
    //   password: '',
    // },
    userData: null,
  },

  getters: {
    user: state => state.userData,
    // userCreditials: state => state.userCreditials,
  },

  mutations: {
    SET_USER_DATA(state, user) {
      state.userData = user;
    },
    // SET_USER_CREDITIALS(state, payload){
    //   console.log('SET_USER_CREDITIALS: ', payload.email, payload.password);
    //   Vue.set(state.userCreditials, state.userCreditials.email, payload.email);
    //   Vue.set(state.userCreditials, state.userCreditials.password, payload.password);
    // },
  },

  actions: {
    sendLoginRequest({ commit, dispatch }, data) {
      return apiClient
        .get("/sanctum/csrf-cookie")
        .then(response => {
          console.log('[SUCCESS] sendLoginRequest: get(/sanctum/csrf-cookie)');
          // console.log('[INFO] sendLoginRequest: post(/login)', data);
          console.log('[INFO] sendLoginRequest: post(/login)');
          apiClient.post('/login', data)
          .then(response => {
            console.log('[SUCCESS] sendLoginRequest: post(/login)');
            dispatch("me");
          }).catch(error => {
            console.log('[ERROR] sendLoginRequest: post(/login)', error.response.data);
            commit("setErrors", error.response.data, {root: true});
          });
        })
        .catch(error => {
          console.log('[ERROR] sendLoginRequest: get(/sanctum/csrf-cookie)', error.response.data);
          commit("setErrors", error.response.data, {root: true});
        });
    },
    logoutUser({commit, dispatch}) {
      return apiClient
        .post("/logout")
        .then(response => {
          console.log('[SUCCESS] logoutUser: post(/logout)', response.data);
          dispatch("me");
        }).catch(error => {
          console.log('[ERROR] logoutUser: post(/logout)', error.response.data);
          commit("setErrors", error.response.data, {root: true});
        });
    },
    me( {commit} ) {
      console.log('me');
      return apiClient
        .get("/api/user")
        .then(response => {
          console.log('[SUCCESS] me: get(api/user):');
          commit("SET_LOGGED_STATUS", true, {root: true});
          commit("SET_USER_DATA", response.data);
        }).catch(error => {
          console.log('[ERROR] me: get(api/user):', error.response.data);
          commit("SET_LOGGED_STATUS", false, {root: true});
          commit("SET_USER_DATA", null);
        });
    },
  }
};
