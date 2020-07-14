<script>
import FormComponent from './Form.vue'

export default {
   name: "FormMaker",
   data() {
      return {
         form: {},
         file: null,
         filename: '',
      }
   },
   components: { FormComponent },
   computed: {
      url: function() {
         return `${this.serverURL}/form/create`
      }
   },
   methods: {
      render(files) {
         this.filename = files[0].name
         files[0].text().then( text => {
            this.form = JSON.parse( text )
         })
      }
   }
}
</script>

<template>
   <div class="page">
      <div class='maker'>
         <div class="upload">
            <input type='file' accept=".js, .json" @change='render($event.target.files)' />
         </div>
         <div class='form'>
            <FormComponent :data='form' />
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