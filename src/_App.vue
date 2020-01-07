<template>
  <div id="app">
   <!-- <FormComponent :queries="queryList" @/> -->
   <Incident />

   <p>here's the access token: {{ access_token }}</p>
  </div>
</template>

<script>
//import FormComponent from "./components/Form.vue";
import Incident from './components/Incident.vue';

export default {
  name: 'app',
  components: { Incident },
  props: [ "queryList", "baseURL", "access_token" ],
  methods: {
    getAccessToken: function(id, user, pass) {
      let url = new URL('token', 'https://utdallastest.cherwellondemand.com/CherwellAPI/');
      url.searchParams.set('grant_type', 'password');
      url.searchParams.set('client_id', id);
      url.searchParams.set('username', user);
      url.searchParams.set('password', pass);

      let response = fetch(url, {
        method: "POST",
        headers: {
          'api-key': "2e6f7c3f-553a-456e-ad75-1a8d35efefc8",
          'Content-Type': "application/x-www-form-urlencoded"
        }
      });

      if(response.ok) {
        let json = response.json();
        //console.log(`Request successful. Response: ${json}`);
        return json.access_token;
      }
      else {
        alert('HTTP-Error: ' + response.status);
        return null;
      }
    }
  },
  created: function() {
    let client_id = '2e6f7c3f-553a-456e-ad75-1a8d35efefc8',
    username = 'ATECPortalAPI',
    password = '!AT3C4Ev3R!';

    this.access_token = this.getAccessToken(client_id, username, password);

    this.queryList = [
      {
        key: 1,
        queryText: "What is your name?",
        response: null,
        queryType: 'text',
        responseType: "string"
      },
      {
        key: 2,
        queryText: "What is your age?",
        response: null,
        queryType: 'text',
        responseType: "number"
      },
      {
        key: 3,
        queryText: "Would you like to continue?",
        response: null,
        queryType: 'radio',
        responseType: "string",
        options: ["yes", "no"]
      }
    ];
  }
}
</script>

<style>

</style>
