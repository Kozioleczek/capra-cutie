<template>
<b-container id="create" fluid tag=section class="content py-5">
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
                v-model="urlToShrink"
                placeholder="https://example.com"
                required
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary">Skróć link</b-button>
            </b-input-group-append>

          </b-input-group>
         </b-form>
          <div class="invalid-feedback d-block" v-if="error">
              {{ error }}
            </div>
        <div
        v-if="urlToShrink != null && urlToShrink != ''"
        class="border w-100 py-4 text-center mt-4">
          <b>Twój link docelowy: https://cut.capra.website/{{randomURL}}</b>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import randomstring from 'randomstring';
import Regex from 'regex';

export default {
  name: "Create",
  data() {
    return {
      urlToShrink: null,
      randomURL: null,
      error: null,
    };
  },
  // watch: {
  //   urlToShrink() {
  //     let regex = new Regex(/\/\/[^\s$.?#].[^\s]*$/);
  //     let test = regex.test(this.urlToShrink);
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
    this.randomURL = randomstring.generate(7);
  }
};
</script>
