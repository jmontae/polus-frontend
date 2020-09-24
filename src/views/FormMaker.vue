<script>
import QueryComponent from '../components/Query.vue'

export default {
   name: "FormMaker",
   data() {
      return {
         form: {},
         file: null,
         filename: '',
         success: null,
	response: false
      }
   },
   components: { QueryComponent },
   computed: {
      form_url: function() {
         return `${this.$baseURL}/form/${this.form.service}/${this.form.category}/${this.form.subcategory}`
      },
      uploaded: function() {
         return JSON.stringify( this.form ) != '{}'
      }
   },
   methods: {
      render(files) {
         this.form = {}
	this.response = false
         this.filename = files[0].name
         files[0].text().then( text => {
            this.form = JSON.parse( text )
         })
      },
      upload() {
      
         console.log('sending request...')
         fetch(`${this.$serverURL}/form/create`, {  method: 'POST', body: JSON.stringify( this.form ),  headers: { 'Content-Type': 'application/json' }})
         .then( response => {
            this.response = true
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
            <div v-show="response">
		<div id="completion" class="completion" v-if="success"> Form Submitted! View the new form <a :href="form_url" target="_blank">here</a></div>
            <div id="completion" class="completion" v-else-if="!success"> Form not submitted! it may already exist, or missing classification.</div>
            </div>
         </div>
      </div>
	</div>
</template>

<style>

</style>
