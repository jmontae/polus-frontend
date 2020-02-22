<script>
	// import Query from '../logic/Query.js';
	import QueryComponent from "./Query.vue";
	import SubmitButton from "./SubmitButton.vue"
	//import EmailRedirect from "./EmailRedirect.vue"

	export default {
		name: "FormComponent",
		title() {
			return `this is a form`
		},
		data: () => {
			return {
				form: {},
				is404: false,
				success: false,
			}
		},
		components: { QueryComponent, SubmitButton },
		created: function() {
			fetch('http://localhost:4000/new_session').then( () => {
				console.log('new session available');
				this.ready = true;
			});
			//get the service classification
			let service = this.$route.params.service,
			category = this.$route.params.category,
			subcategory = this.$route.params.subcategory;

			let uri = encodeURI(`http://localhost:4000/form/${service}/${category}/${subcategory}`);
			//fetch the form queries from the backend
			fetch(uri)
				.then((response) => {
					if( response.status == 200 ) {
						return response.json()
					} else {
						if(response.status == 404) {
							this.is404 = true;
						}
					}
				})
				.then((json) => {
					this.form = json;
					this.form.fields.push({ name: 'NetID', value: 'jxj174730' });
				});
		},
		methods: {
			updateData(obj) {
				this.form.queries.find( (qry) => { 
					if (qry.text == obj.text) {
						qry.value = obj.value;
					}
				});
			}
		}
	}
</script>

<template>
	<div class="form_page">
		<div class="404" v-if="is404">
			<h1>404</h1>
			<h2>We're sorry for the inconvience, but this page doesn't exist.</h2>
			<p>if you're looking for help, please visit <a href="https://atecio.utdallas.edu/help">atecio.utdallas.edu/help</a>.</p>
		</div>
		<div class='form' v-else>
			<h1>{{ form.title }}</h1>
			<QueryComponent v-for="(query, index) in form.queries" :key="index" :text="query.text" :type='query.type' :options="query.options" v-on:update="updateData" />
			<SubmitButton :form="form" />
		</div>
		<div class="overlay" v-if="success">
			<p>Your request has been submitted! You should be receiving an email shortly.</p>
			<button type="button" @click='goToHome'>Close</button>
		</div>
	</div>
</template>

<style>

</style>