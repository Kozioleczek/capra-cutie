<template>
  <div id="app" class="full-height">
    <b-container fluid tag=header class="py-3 py-lg-0">
      <b-row>
        <b-col
          cols=12
          class="d-flex"
          :class="(this.$route.name === 'Redirect') ? 'justify-content-center' : 'justify-content-between'"
          >
            <router-link to="/"><img src="@/assets/capra-cutie-logo.png" alt="" class="c-logo"></router-link>
                <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
            <div
              class="user-space my-auto"
              :class="(this.$route.name === 'Redirect') ? 'd-none' : 'd-flex'"
              >
              <router-link
                to="/login"
                v-if="this.$store.getters.isLogged === false"
                class="mr-3 text-white btn btn-outline-light">
                Zaloguj się
              </router-link>
              <router-link
                to="/my-links"
                v-if="this.$store.getters.isLogged === true"
                class="mr-3 text-white d-none d-lg-block my-auto">
                 🎛 Moje linki
              </router-link>
              <router-link
                to="/create"
                v-if="this.$store.getters.isLogged === true"
                class="mr-3 text-white d-none d-lg-block my-auto">
                 🔗 Stwórz link
              </router-link>
              <button
              class="btn btn-outline-light"
              v-if="this.$store.getters.isLogged === true"
              v-on:click="logout">
              🔚 Wyloguj się</button>
            </div>
        </b-col>
        <b-col
        cols=12
        class="py-3"
        :class="(this.$route.name === 'Redirect') ? 'd-none' : 'd-block d-lg-none'"
        >
              <router-link
                to="/my-links"
                v-if="this.$store.getters.isLogged === true"
                class="mr-3 text-white">
                 🎛 Moje linki
              </router-link>
               <router-link
                to="/create"
                v-if="this.$store.getters.isLogged === true"
                class="mr-3 text-white">
                 🔗 Stwórz link
              </router-link>
        </b-col>
      </b-row>
    </b-container>
    <router-view/>
    <b-container fluid tag=footer class="footer">
      <b-row>
        <b-col cols=12 class="d-lg-flex d-block justify-content-between">
          <span class="my-lg-auto mb-3 d-block">
            Twórca: Wojciech Kozioł <br>
            <a class="text-white" href="https://www.linkedin.com/in/wojciech-koziol/" target="_blank"><b>Zatrudnij mnie</b></a>
          </span>
          <span class="my-lg-auto mb-3 d-block">
            Wszelkie prawa zastrzeżone 2020 CapraCutie
          </span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    logout: function() {
      this.logoutUser().then(() => {
        console.log('[INFO] App.vue: Użytkownik został wylogowany. Przekierowanie na /');
        this.$router.push({ name: "Home" });
      });
    }
  },
}
</script>
<style lang="scss">


$enable-responsive-font-sizes: true;

// Bootstrap and its default variables
@import '../node_modules/bootstrap/scss/bootstrap';
// BootstrapVue and its default variables
@import '../node_modules/bootstrap-vue/src/index.scss';
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Poppins:wght@400,700;900&display=swap');

body, html{
  height: 100%;
  background: #343741;
  color: white;
}
  .my-photo{
    border-radius: 100%;
    width: 100px;
    @include media-breakpoint-only(lg) {
      width: 200px;
    }
    @include media-breakpoint-only(xl) {
      width: 200px;
    }
  }
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @include media-breakpoint-only(lg) {
        padding-left: 5em;
  padding-right: 5em;
  padding-top: 3em;
  padding-bottom: 3em;
  }

  @include media-breakpoint-only(xl) {
        padding-left: 5em;
  padding-right: 5em;
  padding-top: 3em;
  padding-bottom: 3em;
  }
}

h1,.h1,h2,.h2,h3,.h3,h4,.h4,h5,.h5{
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
}
.full-height{
    height: 100%;
    display: flex;
    flex-direction: column;
}

.content{
  flex: 1 0 auto;
}

.footer{
  flex-shrink: 0;
}

.c-logo{
  width: 150px;
  @include media-breakpoint-only(lg) {
    width: 200px;
  }
}

.c-bg-s{
  background: #2F3139;
}

.c-text-p{
  color: #4CA09C;
}

.c-bg-p{
  background: #4CA09C;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
