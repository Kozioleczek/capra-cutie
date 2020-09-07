<template>
  <div id="app" class="full-height">
    <b-container fluid tag=header>
      <b-row>
        <b-col cols=12 class="d-flex justify-content-between">
            <img src="@/assets/capra-cutie-logo.png" alt="" class="c-logo">
                <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
            <div class="user-space my-auto">
              <router-link
                to="/login"
                v-if="this.$store.getters.isLogged === false"
                class="mr-3 text-white">
                Zaloguj się
              </router-link>
              <router-link
                to="/my-links"
                v-if="this.$store.getters.isLogged === true"
                class="mr-3 text-white">
                  Moje linki
              </router-link>
              <router-link
                to="/create"
                v-if="this.$store.getters.isLogged === true"
                class="mr-3 text-white">
                  Stwórz link
              </router-link>
            </div>
        </b-col>
      </b-row>
    </b-container>
    <router-view/>
    <b-container fluid tag=footer class="footer">
      <b-row>
        <b-col cols=12 class="d-flex justify-content-between">
          <span class="my-auto">
            Twórca: Wojciech Kozioł <br>
            <b>Zatrudnij mnie</b>
          </span>
          <span class="my-auto">
            Wszelkie prawa zastrzeżone 2020 CapraCutie
          </span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">

// Bootstrap and its default variables
@import '../node_modules/bootstrap/scss/bootstrap';
// BootstrapVue and its default variables
@import '../node_modules/bootstrap-vue/src/index.scss';
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Poppins:wght@700;900&display=swap');

body, html, #app{
  height: 100%;
}

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background: #343741;
  padding-left: 5em;
  padding-right: 5em;
  padding-top: 3em;
  padding-bottom: 3em;
}

h1,.h1,h2,.h2,h3,.h3,h4,.h4,h5,.h5{
    font-family: 'Poppins', sans-serif;
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
  width: 200px;
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
