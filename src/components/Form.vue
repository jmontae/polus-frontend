<script>
	import QueryComponent from "./Query.vue";
	import SubmitButton from "./SubmitButton.vue"
	import Breadcrumbs from "./Breadcrumbs.vue"
	//import EmailRedirect from "./EmailRedirect.vue"

	export default {
		name: "FormComponent",
		data: () => {
			return {
				form: {},
				queries: {},
				user: null,
				is404: false,
				success: false,
				answered: 0,
				service: null,
				category: null,
				subcategory: null
			}
		},
		components: { QueryComponent, SubmitButton, Breadcrumbs },
		created: function() {
			fetch('http://localhost:4000/new_session').then( () => {
				console.log('new session available');
				this.ready = true;
			});
			//get the service classification
			this.service = this.$route.params.service,
			this.category = this.$route.params.category,
			this.subcategory = this.$route.params.subcategory;

			let uri = encodeURI(`http://localhost:4000/form/${this.service}/${this.category}/${this.subcategory}`);
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
					this.queries = this.form.queries;
					document.title += ` | ${this.form.title}`;
				});
		},
		methods: {
			updateData(obj) {
				//search for the query
				this.form.queries.find( (qry) => { 
					if (qry.text == obj.text) {
							if(!obj.value.length) { this.answered--; }
							if(!qry.value || !qry.value.length) { this.answered++; }
							
							qry.value = obj.value;
							if(obj.subqueries) { qry.subqueries = obj.subqueries; }
						}
				});
			},
			updateUser(value) {
				this.form.fields.forEach( field => {
					if( field.name == "NetID" ) {
						field.value = value;
					} 
				});
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
			<Breadcrumbs :root="this.$baseURL" :type="form.type" :service="service" :category="category" :subcategory="subcategory" />
			<div class='form'>
				<h1>{{ form.title }}</h1>
				<p>{{ form.details }}</p>
				<div class="query">
					<h4 class="query_text">Please enter your NetID.</h4>
					<div class="query_value">
						<input type="text" v-model="user" v-on:keyup="updateUser(user)" placeholder="...">
					</div>
				</div>
				<QueryComponent v-for="(query, index) in queries" :key="index" :text="query.text" :type='query.type' :options="query.options" :subqries="query.subqueries" v-on:update="updateData" />
				<SubmitButton :form="form" :answered="answered" />
			</div>
		</div>
	</div>
</template>

<style>
.page {
	display: block;
	margin: 0 auto;
	margin-bottom: 80px;
}

</style>