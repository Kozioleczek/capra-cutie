<template>
  <b-container tag="section" class="content py-5">
    <b-row class="h-75">
      <b-col cols="12" class="my-auto">
        <b-row>
          <b-col cols="12" class="text-center">
            <h1>Zaloguj się</h1>
          </b-col>
          <b-col cols="12" lg="6" class="mx-auto">
            <b-form action="#" @submit.prevent="login">
              <b-form-group id="login" label="Twój email" label-for="login-input">
                <b-form-input
                  id="login-input"
                  type="email"
                  v-model="details.email"
                  placeholder="example@example.com"
                  required
                >
                </b-form-input>
              </b-form-group>
              <b-form-group id="password" label="Hasło" label-for="password-input">
                <b-form-input
                  id="password-input"
                  type="password"
                  v-model="details.password"
                  required
                  placeholder="Twoje hasło"
                >
                </b-form-input>
              </b-form-group>
              <VueLoadingButton
                type="submit"
                class="w-100 btn-lg mt-3 bg-warning text-dark"
                :styled="true"
                :loading="$store.state.isLoggedLoading"
              >
                Zaloguj się
              </VueLoadingButton>
            </b-form>

            <div class="border border-warning p-4 mt-5">
              <b>⚠️ Dane logowania:</b>
              <p>
                Na ten moment nie dodałem rejestracji w aplikacji. W celu zalogowania się skorzystaj
                z moich danych:<br />
                <strong>Login: hello@capraweb.pl</strong><br />
                <strong>Hasło: 12345</strong>
              </p>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueLoadingButton from 'vue-loading-button';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {
    VueLoadingButton,
  },
  data() {
    return {
      details: {
        email: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapGetters(['errors']),
  },
  mounted() {
    this.$store.commit('setErrors', {});
  },
  methods: {
    ...mapActions('auth', ['sendLoginRequest']),
    login() {
      this.sendLoginRequest(this.details).then(() => {
        console.log('[INFO] Login.vue: Przekierowanie Moje Linki');
        this.$router.push({ name: 'MyLinks' });
      });
    },
  },
};
</script>
