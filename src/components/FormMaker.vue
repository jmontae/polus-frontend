<script>
import QueryComponent from './Query.vue'

export default {
   name: "FormMaker",
   data() {
      return {
         form: {},
         file: null,
         filename: '',
         success: null
      }
   },
   components: { QueryComponent },
   computed: {
      url: function() {
         return `${this.serverURL}/form/create`
      },
      uploaded: function() {
         return JSON.stringify( this.form ) != '{}'
      },
      submit_text: function() {
         let text = ""

         switch( this.success ) {
            case true:
               text = "form submitted!"
               break

            case false:
               text = "form not submitted! it may already exist, or missing classification"
               break

            default:
               text =  'Be sure to double-check your code before submitting!'
               break
         }

         return text
      }
   },
   methods: {
      render(files) {
         this.form = {}

         this.filename = files[0].name
         files[0].text().then( text => {
            this.form = JSON.parse( text )
         })
      },
      upload() {
      
         console.log('sending request...')
         fetch('http://localhost:9000/form/create', {  method: 'POST', body: JSON.stringify( this.form ),  headers: { 'Content-Type': 'application/json' }})
         .then( response => {
            this.success = response.ok
         })
      }
   }
}
</script>

<template>
   <div class="page container">
      <div class='maker'>
         <div class="upload">
            <input type='file' accept=".js, .json" @change='render($event.target.files)' />
         </div>
         <div v-if="uploaded" class='form'>
				<h1>{{ form.title }}</h1>
				<p>{{ form.details }}</p>
				<QueryComponent v-for="(query, index) in form.queries" :key="index" :text="query.text" :type='query.type' :options="query.options" :subqries="query.subqueries" />
			</div>
         <div class='submit'>
            <button class="submit_button" type="button" @click="upload">Upload</button>
            <div id="completion" class="completion"> {{ submit_text }}</div>
         </div>
      </div>
	</div>
</template>

<style>

</style>