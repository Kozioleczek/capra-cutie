<template>
  <b-container fluid tag="section" class="content py-5">
    <b-row>
      <b-col cols="12" class="text-left">
        <h1 class="display-4 font-weight-bolder">Twoje krótkie linki</h1>
        <p class="lead">Znajdziesz tutaj wszystkie linki, które utworzyłeś</p>
      </b-col>
      <b-col cols="12">
        <loading
          :active.sync="$store.state.isUrlsLoading"
          :is-full-page="false"
          :color="'#ffc107'"
        />
        <b-row>
          <b-col v-for="url in this.$store.getters.loadedUrls" :key="url.id" cols="12" lg="6">
            <div class="d-flex c-bg-s p-3 mb-3">
              <div class="w-50">
                <small>Link docelowy:</small><br />
                <a :href="url.long" class="text-white">{{ url.long }}</a
                ><br />
                <small>Link CapraCutie:</small><br />
                <a :href="`https://localhost:8080/${url.short}`" class="text-warning"
                  >https://localhost:8080/{{ url.short }}</a
                >
              </div>
              <div class="w-50 my-auto">
                <button class="btn btn-sm btn-outline-light w-50" @click="deleteU(url.short)">
                  Usuń link
                </button>
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
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'MyLinks',
  components: {
    Loading,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['errors']),
  },
  mounted() {
    this.$store.commit('setErrors', {});
  },
  beforeCreate() {
    this.$store.dispatch('getUsersUrls');
  },
  methods: {
    deleteU($short) {
      console.log('[INFO] deleteU: $short', $short);
      this.$store.dispatch('deleteUrl', $short);
    },
  },
};
</script>
