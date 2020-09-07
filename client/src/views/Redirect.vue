<template>
  <b-container fluid tag=section class="content py-5">
    <b-row>
      <b-col cols=12 class="text-center">
        <h1>Za chwilę zostaniesz przekierowany na: <br> <big>{{url}}</big></h1>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Redirect",
  props: ["url"],
  data() {
    return {

    };
  },
}
</script>

<style>

</style>
