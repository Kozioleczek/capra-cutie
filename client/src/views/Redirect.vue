<template>
  <b-container tag=section class="content py-5">
    <b-row class="h-75">
      <b-col cols=12 class="my-auto">
        <b-row>
      <b-col cols=12 class="text-center mb-5">
        <h1><small class="font-weight-normal">Za chwilę zostaniesz przekierowany na: </small><br>
        <big>{{$store.state.redirectUrl.long}}</big>
        </h1>
      </b-col>
      <b-col cols=7 class="mx-auto text-center">
        <div class="d-flex c-bg-s box p-4">
            <div class="row no-gutters">
              <div class="col-6 my-auto">
                <img src="@/assets/obrobione.jpg" alt="" class=" my-photo">
                <b class="d-block mt-2">Wojciech Kozioł</b>
              </div>
              <div class="col-6 my-auto text-left">
                <h2 class="h3">Czy wiesz, że...</h2>
                <p class="lead"><b>Facet na zdjęciu szuka pracy jako Junior Frontend Developer?</b>
                </p>
                <p class="lead">Po prostu kliknij i <span class="text-c-gold"> <b>poznaj go!</b></span></p>

                <a href="https://www.linkedin.com/in/wojciech-koziol/" target="_blank" class="btn btn-warning">Poznaj Wojciecha Kozioł</a>
              </div>
            </div>
        </div>
      </b-col>
        <!-- <button @click="getRedirect">Pobierz</button> -->
            </b-row>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Redirect",
  props: ["redirect"],
  data() {
    return {
      temp: null,
    };
  },
  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
    console.log(this.$router.currentRoute.params.redirect);
    this.$store.dispatch('getRedirectUrl', { redirect: this.redirect });
    setTimeout(()=> window.location = this.$store.state.redirectUrl.long, 10000)
  },
  // beforeCreate() {

  // },
  // methods: {
  //   ...mapActions(["getRedirectUrl"]),
  //   getRedirect: function() {
  //     this.getRedirectUrl(this.redirect).then(() => {
  //       console.log('[INFO] Redirect.vue: Link załadowany');
  //     });
  //   }
  // },
}
</script>

<style lang="scss" scope>
  .my-photo{
    border-radius: 100%;
    width: 200px;
  }

  .box{
    border-radius: 25px;
  }

  .text-c-gold{
    color: #FFC844;
  }
</style>
