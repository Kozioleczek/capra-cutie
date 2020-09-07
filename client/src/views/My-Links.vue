<template>
  <b-container fluid tag=section class="content py-5">
    <b-row>
      <b-col cols=12 class="text-left">
        <h1 class="display-4 font-weight-bolder">Twoje krótkie linki</h1>
        <p class="lead">Znajdziesz tutaj wszystkie linki, które utworzyłeś</p>
      </b-col>

      <b-col cols=12 v-if="$store.state.isUrlsLoaded === true">
        <b-row>
          <b-col v-for="url in this.$store.getters.loadedUrls" :key="url.id" cols=6>
            <div class="d-flex c-bg-s p-3 mb-3">
              <div class="w-50">
                  <small>Link docelowy:</small><br>
                  <a :href="url.long">{{url.long}}</a><br>
                  <small>Link CapraCutie:</small><br>
                  <a :href="`https://localhost:8080/${url.short}`" class="c-text-p">https://localhost:8080/{{url.short}}</a>
              </div>
              <div class="w-50">
                  <small>Statystyki</small><br>
                  <p>{{ url.visitors }}</p>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'MyLinks',
  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },
  beforeCreate() {
    this.$store.dispatch('getUsersUrls');
    // ...mapActions(["getUsersUrls"]),
    // getUrls: function() {
    //   this.getUsersUrls().then(() => {
    //     console.log('[INFO] My-Links.vue: Załadowano skrócone linki użytkownika');
    //   });
    // }
  },
  methods: {
    ...mapActions(["getUsersUrls"]),
    getUrls: function() {
      this.getUsersUrls().then(() => {
        console.log('[INFO] My-Links.vue: Załadowano skrócone linki użytkownika');
      });
    }
  },
}
</script>

