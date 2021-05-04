<template>
  <b-container id="create" tag="section" class="content py-5">
    <loading
      :active.sync="$store.state.isRedirectUrlLoading"
      :is-full-page="true"
      :color="'#ffc107'"
    />
    <b-row class="h-75">
      <b-col cols="12" class="my-auto">
        <b-row>
          <b-col cols="12" class="text-center mb-4">
            <h1 class="display-4 font-weight-bolder">
              Wpisz swój link i <span class="c-text-p">skróć go!</span>
            </h1>
          </b-col>
          <b-col cols="12" lg="8" class="mx-auto">
            <b-input-group :state="state">
              <b-form-input
                type="url"
                v-model="details.long"
                class="form-control-lg"
                placeholder="https://example.com"
                required
              ></b-form-input>
              <b-input-group-append>
                <b-button class="c-bg-p" @click="check">✂️ Skróć link </b-button>
              </b-input-group-append>
            </b-input-group>

            <div class="invalid-feedback d-block" v-if="error == true">
              {{ feedback }}
            </div>
            <div class="valid-feedback d-block" v-if="success == true">
              {{ feedback }}
            </div>
            <div
              v-if="details.long != null && details.long != ''"
              class="border w-100 py-4 text-center mt-4"
            >
              <b>Twój link docelowy: https://cut.capra.website/{{ details.short }}</b>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import randomstring from 'randomstring';
// import Regex from 'regex';
import Loading from 'vue-loading-overlay';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Create',
  components: {
    Loading,
  },
  data() {
    return {
      details: {
        long: '',
        short: null,
      },
      error: false,
      success: false,
      feedback: '',
      state: null,
    };
  },
  mounted() {
    this.details.short = randomstring.generate(7);
    this.$store.commit('setErrors', {});
  },
  computed: {
    ...mapGetters(['errors']),
  },
  methods: {
    ...mapActions(['createNewUrl']),
    create() {
      this.createNewUrl(this.details).then(() => {
        console.log('[INFO] Create.vue: Utworzono nowy URL. Przekierowanie na Moje Linki');
        this.$router.push({ name: 'MyLinks' });
      });
    },
    check() {
      console.log('check', this.details.long);
      // eslint-disable-next-line no-useless-escape
      const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      if (regex.test(this.details.long) === true) {
        console.log('[SUCCESS] Correct URL: ', regex.test(this.details.long));
        this.success = true;
        this.error = false;
        this.feedback = 'Twój link jest poprawny!';
        this.create();
      }
      if (regex.test(this.details.long) === false) {
        this.error = true;
        this.success = false;
        this.feedback = 'Twój link jest niepoprawny! Poprawny link wygląda tak: https://wp.pl';
      }
    },
  },
};
</script>
