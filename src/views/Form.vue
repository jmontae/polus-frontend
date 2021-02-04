<script>
	import QueryComponent from "../components/Query.vue"
	import Breadcrumbs from "../components/Breadcrumbs.vue"
	//import EmailRedirect from "./EmailRedirect.vue"

	export default {
		name: "FormComponent",
		data: () => {
			return {
				form: {},
				queries: {},
				is404: false,
				loading: true,
				success: false,
				answered: 0,
				test: null
			}
		},
		components: { QueryComponent, Breadcrumbs },
		computed: {
			subject: function() {
				return this.form.service + " / " + this.form.category + " / " + this.form.subcategory;
			}
		},
		created: async function() {
			//fetch the form queries from the backend
			fetch(`${this.$serverURL}/s/ui/forms/${this.$route.params.tenant}/${this.$route.params.service}/${this.$route.params.category}/${this.$route.params.subcategory}`)
			.then( result => {
				if( !result.ok ) {
					console.log( result )
					this.is404 = true
					this.loading = false
				} else {
					return result.json()
				}
			}).then( form => {
				this.form = form
				this.queries = form.queries
				document.title += ` | ${this.form.title}`
				this.loading = false
			})
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

					let body = `Team: ${ this.form.team } \n\n${ this.form.service } / ${ this.form.category } / ${ this.form.subcategory }\n${ this.form.title }\n\n` + queries
					return encodeURI(body)
			},
			checkForInvalidInputs() {
				let inputs = document.querySelectorAll('input'),
				inputInvalid
				console.log( inputs )
				inputs.forEach( input => {
					let matches = ( input.matches || input.msMatchesSelector ),
					match = matches.call( input, ':invalid' )
					if( match ) {
						inputInvalid = match
					}
				})

				return inputInvalid
			},
			finish() {
				let invalid = this.checkForInvalidInputs()
				if( !invalid ) {
					console.log( this.$serverURL)
					this.form.fields.push( { name: 'CustomerEmail', value: 'jxj174730@utdallas.edu' }, { name: 'OnBehalfOfNetID', value: 'jxj174730'} )
					fetch( `${this.$serverURL}/s/ui/forms/submit`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.form) })
					.then( result => {
						if( !result.ok ) {
							this.submit_success = false, this.auth = false
							console.log( result );
						} else {
							this.submit_success = true, this.auth = false
							alert('form submitted successfully')
							console.log( result );
							window.location.reload()
						}
					})
					
					
				
				} else {
					alert( 'Some responses are invalid. Please check the responses marked red.' )
					console.log( 'there are invalid inputs' )
				}

			}
		}
	}
</script>

<template>
	<div class="form container mx-auto">
		<div class="loading" v-if='loading'>
			<h2>loading...</h2>
		</div>
		<div class="404" v-else-if="is404">
			<h1>404</h1>
			<h2>We're sorry for the inconvience, but this page doesn't exist.</h2>
			<p>if you're looking for help, please visit <a href="https://atecio.utdallas.edu/help">atecio.utdallas.edu/help</a>.</p>
		</div>
		<div v-else class="m-2">
			<Breadcrumbs :root="this.$baseURL" :type="form.type" :service="form.service" :category="form.category" :subcategory="form.subcategory" />
			<div class='form_content m-5'>
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
.form {
	display: block;
	margin: 0 auto;

	padding: 50px 0;
   min-height: 100vh;
   
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
