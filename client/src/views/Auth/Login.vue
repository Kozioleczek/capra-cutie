<template>
  <b-container fluid tag=section class="content py-5">
    <b-row>
      <b-col cols=12 class="text-center">
        <h1>Zaloguj się</h1>
      </b-col>
      <b-col cols=12 class="mx-auto">
          <b-form
          action="#"
          @submit.prevent="login"
          >
          <b-form-group
              id="login"
              label="Twój email"
              label-for="login-input"
              >
                <b-form-input
                id="login-input"
                type="email"
                v-model="details.email"
                placeholder="example@example.com"
                required
                >
                </b-form-input>
              </b-form-group>
            <b-form-group
              id="password"
              label="Hasło"
              label-for="password-input"
              >
                <b-form-input
                id="password-input"
                type="password"
                v-model="details.password"
                required
                >
                </b-form-input>
              </b-form-group>
             <b-button
              variant="primary"
              type="submit"
              class="w-100 btn-lg mt-3">Zaloguj się</b-button>
          </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'Login',
  data() {
    return {
      details: {
        email: null,
        password: null,
      }
    };
  },
  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },
  // watch: {
  //   query() {
  //     this.$store.commit('SET_USER_CREDITIALS', {
  //       email: this.email,
  //       password: this.password
  //     });
  //   }
  // },
  methods: {
    ...mapActions("auth", ["sendLoginRequest"]),
    login: function() {
      this.sendLoginRequest(this.details).then(() => {
        console.log('Login.vue: Wysłane dane', this.details);
      });
    }
  },
}
</script>
