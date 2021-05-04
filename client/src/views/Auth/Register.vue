<template>
  <b-container fluid tag="section" class="content py-5">
    <b-row>
      <b-col cols="12" class="text-center">
        <h1>Zarejestruj się</h1>
        <p class="lead">Dzięki temu zyskasz swobodę zarządzania linkami</p>
      </b-col>
      <b-col cols="4" class="mx-auto">
        <b-form>
          <b-form-group id="register-name" label="Twoje imie" laber-for="register-name-input">
            <b-form-input
              id="register-name-input"
              type="text"
              :class="{ 'is-invalid': errors.name }"
              v-model="details.name"
              placeholder="Podaj imię"
              required
            >
            </b-form-input>
            <div class="invalid-feedback" v-if="errors.name">
              {{ errors.name[0] }}
            </div>
          </b-form-group>

          <b-form-group id="register-email" label="Adres email" label-for="register-email-input">
            <b-form-input
              id="register-email-input"
              :class="{ 'is-invalid': errors.email }"
              v-model="details.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
            <div class="invalid-feedback" v-if="errors.email">
              {{ errors.email[0] }}
            </div>
          </b-form-group>
          <b-form-group id="register-password" label="Hasło" label-for="register-password-input">
            <b-form-input
              id="register-password-input"
              type="password"
              required
              placeholder="Podaj hasło"
              :class="{ 'is-invalid': errors.password }"
              v-model="details.password"
            ></b-form-input>
            <div class="invalid-feedback" v-if="errors.password">
              {{ errors.password[0] }}
            </div>
          </b-form-group>
          <b-form-group
            id="register-password-repeat"
            label="Powtórz hasło"
            label-for="register-password-repeat-input"
          >
            <b-form-input
              id="register-password-repeat-input"
              type="password"
              required
              placeholder="Powtórz hasło"
              v-model="details.password_confirmation"
            ></b-form-input>
            <div class="invalid-feedback" v-if="errors.password">
              {{ errors.password[0] }}
            </div>
          </b-form-group>
          <b-button variant="primary" @click="register" type="button" class="w-100 btn-lg mt-3"
            >Zarejestruj się</b-button
          >
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      details: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
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
    ...mapActions('auth', ['sendRegisterRequest']),
    register() {
      this.sendRegisterRequest(this.details).then(() => {
        this.$router.push({ name: 'Create' });
      });
    },
  },
};
</script>
