<template>
  <b-container tag="section" class="content py-5">
    <b-row class="h-75">
      <b-col cols="12" class="my-auto">
        <loading
          :active.sync="$store.state.isRedirectUrlGetting"
          :is-full-page="false"
          :color="'#ffc107'"
        />
        <b-row>
          <b-col cols="12" class="text-center mb-5">
            <h1>
              <small class="font-weight-normal">Za chwilę zostaniesz przekierowany na: </small
              ><br />
              <big>{{ $store.state.redirectUrl.long }}</big>
            </h1>
          </b-col>
          <b-col cols="12" lg="7" class="mx-auto text-center">
            <div class="d-flex c-bg-s box p-4">
              <div class="row no-gutters">
                <div class="col-lg-6 col-12 my-lg-auto mb-3 mb-lg-0">
                  <img src="@/assets/obrobione.jpg" alt="" class="my-photo" />
                  <b class="d-block mt-2">Wojciech Kozioł</b>
                </div>
                <div class="col-lg-6 col-12 my-auto text-lg-left text-center">
                  <h2 class="h3">Czy wiesz, że...</h2>
                  <p class="lead">
                    <b>Facet na zdjęciu szuka pracy jako Junior Frontend Developer?</b>
                  </p>
                  <p class="lead">
                    Po prostu kliknij i <span class="text-c-gold"> <b>poznaj go!</b></span>
                  </p>

                  <a
                    href="https://www.linkedin.com/in/wojciech-koziol/"
                    target="_blank"
                    class="btn btn-warning"
                    >Poznaj Wojciecha Kozioł</a
                  >
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';

export default {
  name: 'Redirect',
  props: ['redirect'],
  components: {
    Loading,
  },
  data() {
    return {
      temp: null,
    };
  },
  computed: {
    ...mapGetters(['errors']),
  },
  mounted() {
    this.$store.commit('setErrors', {});
    console.log(this.$router.currentRoute.params.redirect);
    setTimeout(() => {
      window.location = this.$store.state.redirectUrl.long;
    }, 7000);
  },
};
</script>

<style lang="scss">
.box {
  border-radius: 25px;
}

.text-c-gold {
  color: #ffc844;
}
</style>
