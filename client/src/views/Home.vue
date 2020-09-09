<template>
  <b-container fluid tag=section class="content">
    <b-row class="h-100">
      <b-col cols=12 class="text-lg-center  text-left my-auto">
        <h1 class="display-4 font-weight-bolder">
          Pójdź na <span class="c-text-p">skróty</span>
          ze swoim linkiem
        </h1>
        <p class="lead mb-4">Stwórz krótki link wraz ze statystykami</p>
        <router-link
        to="/create"
        class="btn c-bg-p btn-lg mb-2"
        >
        Stwórz swój krótki link
        </router-link>
        <span class="d-block">lub
           <router-link
        to="/login"
        class="c-text-p"
        >
          Zaloguj się
        </router-link>
        </span>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',

};
</script>
