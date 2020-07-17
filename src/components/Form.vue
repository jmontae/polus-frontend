<script>
	import QueryComponent from "./Query.vue"
	import Breadcrumbs from "./Breadcrumbs.vue"
	//import EmailRedirect from "./EmailRedirect.vue"

	export default {
		name: "FormComponent",
		props: [ 'data' ],
		data: () => {
			return {
				form: {},
				queries: {},
				is404: false,
				success: false,
				answered: 0,
				service: null,
				category: null,
				subcategory: null
			}
		},
		components: { QueryComponent, Breadcrumbs },
		computed: {
			teamName: function() {
				if(this.form.service == "Events" || this.form.service == "Facilities") {
					return 'ATEC Events and Facilities';
				} else { return `ATEC ${this.form.service}` }
			},
			subject: function() {
				return this.service + " / " + this.category + " / " + this.subcategory;
			}
		},
		created: function() {
			if( this.data != null ) {
				this.form = this.data
				this.queries = this.form.queries
			} else {
				fetch(`${this.serverURL}/new_session`).then( () => {
					console.log('new session available');
					this.ready = true;
				});
				//get the service classification
				this.service = this.$route.params.service,
				this.category = this.$route.params.category,
				this.subcategory = this.$route.params.subcategory;

				let uri = encodeURI(`${this.serverURL}/form/${this.service}/${this.category}/${this.subcategory}`);
				//fetch the form queries from the backend
				fetch(uri)
					.then((response) => {
						console.log(response)
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
			}
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
			makeForm() {
				let queries = "";
					//process the form queries
					this.form.queries.forEach( query => {
						
						//if value is an array, convert it to string and add a space after commas
						if ( Array.isArray(query.value) ) {
							query.value = query.value.toString()
							query.value.replace(/,/g, ", ");
						} 

						queries += `${query.text}\n${query.value}\n\n`;

						if(query.subqueries != null) {

							query.subqueries.forEach(subqry => {
								if ( Array.isArray(subqry.value) ) {
									subqry.value = subqry.value.toString().replace(/,/g, ", ");
								}

								queries += `   ${subqry.text}\n${subqry.value}\n\n`;
							});
						}
					});

					let body = `${ this.service } / ${ this.category } / ${ this.subcategory }\n${ this.form.title }\n\n` + queries
					return encodeURI(body)
			},
			finish() {

				window.location.href = `mailto:atec.atlas@utdallas.edu?body=${ this.makeForm() }`
				location.reload()
			}
		}
	}
</script>

<template>
	<div class="page container">
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
				<QueryComponent v-for="(query, index) in queries" :key="index" :text="query.text" :type='query.type' :options="query.options" :subqries="query.subqueries" v-on:update="updateData" />
				<div class="submit">
					<button class="submit_button" type="button" @click="finish()">Finish</button>
					<div id="completion" class="completion">{{ answered }}/{{ form.queries.length }} answered</div>
				</div>
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

.container {
	padding-top: 40px;
	display: flex;
	justify-content: center;
	align-content: center;
	margin: 0 20px;
}

	.submit {
		background-color: white;
		position: fixed;
		width: 100vw;
		bottom: 0;
		left: 0;
		border-top: solid 1px gray;
		z-index: 98;
	}

	.submit > * {
		display: inline-block;
	}

	.submit_button {
		margin: 10px 0px 10px 15px;
		padding: 15px 20px;
		text-transform: uppercase;
		background-color: #67e67a;
		text-decoration: none;
		border: none;

	}

	.completion {
		padding: 0 20px;
	}

</style>