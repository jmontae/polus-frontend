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
					this.form.fields.push({ name: 'NetID', value: 'jxj174730' });
					document.title += ` | ${this.form.title}`;
				});
		},
		methods: {
			updateData(obj) {
				this.form.queries.find( (qry) => { 
					if (qry.text == obj.text) {
						if(!obj.value.length) { this.answered--; }
						if(!qry.value || !qry.value.length) { this.answered++; }
						qry.value = obj.value;
					} else if( qry.hasSubqueries ) {
						query.subqueries.find( (subq) => {
							if (subq.text == obj.text) {
								if(!obj.value.length) { this.answered--; }
								if(!qry.value || !subq.value.length) { this.answered++; }
								subq.value = obj.value;
							}
						});
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
				<QueryComponent v-for="(query, index) in form.queries" :key="index" :text="query.text" :type='query.type' :options="query.options" v-on:update="updateData" />
				<div v-if="qry.hasSubqueries" class="subqueries">
					<QueryComponent v-for="(subq, index) in query.subqueries" :key="index" :text="subq.text" :type='subq.type' :options="subq.options" v-on:update="updateData" />
				</div>
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