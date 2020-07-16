<script>
import QueryComponent from './Query.vue'

export default {
   name: "FormMaker",
   data() {
      return {
         form: {},
         file: null,
         filename: ''
      }
   },
   components: { QueryComponent },
   computed: {
      url: function() {
         return `${this.serverURL}/form/create`
      },
      uploaded: function() {
         return JSON.stringify( this.form ) != '{}'
      }
   },
   methods: {
      render(files) {
         this.form = {}

         this.filename = files[0].name
         files[0].text().then( text => {
            this.form = JSON.parse( text )
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
				<QueryComponent v-for="(query, index) in form.queries" :key="index" :text="query.text" :type='query.type' :options="query.options" :subqries="query.subqueries" v-on:update="updateData" />
			</div>
      </div>
	</div>
</template>

<style>

</style>