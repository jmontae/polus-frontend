<script>
import FormComponent from './Form.vue'

export default {
   name: "FormMaker",
   data() {
      return {
         formstring: '',
         url: `${this.serverURL}/form/create`
      }
   },
   components: { FormComponent },
   methods: {
      parse() {
         this.form = JSON.parse(this.formstring)
      }
   }
}
</script>

<template>
   <div class="page">
		<div class="404" v-if="is404">
			<h1>404</h1>
			<h2>We're sorry for the inconvience, but this page doesn't exist.</h2>
			<p>if you're looking for help, please visit <a href="https://atecio.utdallas.edu/help">atecio.utdallas.edu/help</a>.</p>
		</div>
		<div v-else>
			<div class='maker'>
				<div class="json">
               <textarea class='textarea' v-model="formstring" v-on:keyup="parse"></textarea>
            </div>
            <div class='form'>
               <FormComponent :data='form' />
            </div>
			</div>
		</div>
	</div>
</template>

<style>
.maker .textarea {
   max-height: 100%;
   max-width: 100%;
}

.json, .maker .form {
   max-height: 70vh;
   max-width: 45%;
}


</style>