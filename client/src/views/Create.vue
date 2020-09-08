<template>
<b-container id="create" tag=section class="content py-5">
    <loading
        :active.sync="$store.state.isRedirectUrlLoading"
        :is-full-page="true"
        :color="'#ffc107'"
    />
    <b-row class="h-75">
      <b-col cols=12 class="my-auto">
        <b-row>
      <b-col cols=12 class="text-center mb-4">
        <h1 class="display-4 font-weight-bolder">
          Wpisz swój link i  <span class="c-text-p">skróć go!</span>
        </h1>

      </b-col>
      <b-col cols=8 class="mx-auto">
         <b-form
          action="#"
          >
          <b-input-group>
            <b-form-input
                type="url"
                v-model="details.long"
                class="form-control-lg"
                placeholder="https://example.com"
                required
            ></b-form-input>
            <b-input-group-append>
              <b-button
              class="c-bg-p"
              @click="create"
              >✂️ Skróć link
              </b-button>
            </b-input-group-append>

          </b-input-group>
         </b-form>
          <div class="invalid-feedback d-block" v-if="error">
              {{ error }}
            </div>
        <div
        v-if="details.long != null && details.long != ''"
        class="border w-100 py-4 text-center mt-4">
          <b>Twój link docelowy: https://cut.capra.website/{{details.short}}</b>
        </div>
      </b-col>
    </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import randomstring from 'randomstring';
import Regex from 'regex';
import Loading from 'vue-loading-overlay';
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Create",
  components: {
      Loading,
  },
  data() {
    return {
      details: {
        long: null,
        short: null,
      },
      error: null,
    };
  },
  // watch: {
  //   long() {
  //     let regex = new Regex(/\/\/[^\s$.?#].[^\s]*$/);
  //     let test = regex.test(this.long);
  //     console.log(test);
  //     if(test){
  //       this.error = "Twój link jest poprawny!";
  //     }
  //     else {
  //       this.error = "Poprawny adres URL składa się z protokołu https:// lub http:// i kończy się na domenie np. .pl"
  //     }
  //   },
  // },
  mounted() {
    this.details.short = randomstring.generate(7);
    this.$store.commit("setErrors", {});
  },
  computed: {
    ...mapGetters(["errors"])
  },
  methods: {
    ...mapActions(["createNewUrl"]),
    create: function() {
      this.createNewUrl(this.details).then(() => {
        console.log('[INFO] Create.vue: Utworzono nowy URL. Przekierowanie na Moje Linki');
        this.$router.push({ name: "MyLinks" });
      });
    }
  },
};
</script>
