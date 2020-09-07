<template>
  <b-container fluid tag=section class="content py-5">
    <b-row>
      <b-col cols=12 class="text-center">
        <h1>Za chwilę zostaniesz przekierowany na: <br>
        <big>{{$store.state.redirectUrl.long}}</big>
        </h1>
        <!-- <button @click="getRedirect">Pobierz</button> -->
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
    setTimeout(()=> window.location = this.$store.state.redirectUrl.long, 2000)
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

<style>

</style>
