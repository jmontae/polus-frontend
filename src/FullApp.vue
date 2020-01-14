<template>
  <div id="app">
   <!-- <FormComponent :queries="queryList" @/> -->
  </div>
</template>

<script>
/* eslint no-console: ["warn", { allow: ["error", "log"] }] */
//import FormComponent from "./components/Form.vue";
//import Incident from './components/Incident.vue';

export default {
  name: 'app',
  props: [ "queryList"],
  mounted: function() {
    this.$cherwell.requestToken().then( () => {
      console.log('access token received. ready for for communication with Cherwell');
    }).catch( error => { console.log(error.message); });
  }
}
</script>

<style>

</style>
