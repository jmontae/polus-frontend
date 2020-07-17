<script>
	export default {
		name: "SubmitButton",
		data() {
			return {
				submit_success: false,
				auth_fail: false,
				visible: false,
				auth: false,
				username: null,
				password: null,
				totalQueries: null
			}
		},
		props: ['form', 'answered'],
		computed: {
			teamName: function() {
			if(this.form.service == "Events" || this.form.service == "Facilities") {
				return 'ATEC Events and Facilities';
			} else { return `ATEC ${this.form.service}` }
		},
		body: function() {
			let text = 
			`Team: ${this.teamName}

-- enter your email below this line--



`;

			return encodeURI(text);
		},
		subject: function() {
			return this.service + " / " + this.category + " / " + this.subcategory;
		},
		mailTo: function(body) {
			return `mailto:atec.atlas@utdallas.edu?body=${body}`;
		}
		},
		mounted: function() {
				//get the total number of queries
				this.totalQueries = this.form.queries.length;

		},
		methods: {
			makeForm() {
				let queries = "";
					//process the form queries
					this.form.queries.forEach( query => {
						
						//if value is an array, convert it to string and add a space after commas
						if ( Array.isArray(query.value) ) {
							query.value = query.value.toString()
							query.value.replace(/,/g, ", ");
						} 

						queries += `<p><b>${query.text}</b><br />${query.value}</p>`;

						if(query.subqueries != null) {

							query.subqueries.forEach(subqry => {
								if ( Array.isArray(subqry.value) ) {
									subqry.value = subqry.value.toString().replace(/,/g, ", ");
								}

								queries += `<p><b>${subqry.text}</b><br />${subqry.value}</p>`;
							});
						}
					});

					let body = `<h3>${ this.service } / ${ this.category } / ${ this.subcategory }<h3><h2>${ this.name }` + queries
					return encodeURI(body)
			},
			finish() {
				window.location.href = this.mailTo( this.makeForm() )
				location.reload()
			}
		}
	}
</script>
	
<template>
	<div class="submit">
		<button class="submit_button" type="button" @click="finish">Finish</button>
		<div id="completion" class="completion">{{ answered }}/{{ form.queries.length }} answered</div>
	</div>
</template>

<style>
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

	.success-fail {
		z-index: 99;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(255,255,255, 0.7);
	}

	.success-fail_message {
		width: 500px;
		min-height: 150px;

		background-color: #ddd;
		text-align: center;
		display: block;
		margin: 0 auto;
		margin-top: 40vh;
	}

	.success-fail_message > * {
		display: inline-block;
	}

	.success-fail_message button {
		padding: 15px 20px;
		text-transform: uppercase;
		color: #f2f2f2;
		background-color: black;
		text-decoration: none;
		border: none;
	}

	.submit_button {
		margin: 10px 0px 10px 15px;
		padding: 15px 20px;
		text-transform: uppercase;
		background-color: #67e67a;
		text-decoration: none;
		border: none;

	}

	.auth_button, .success_button {
		padding: 15px 0;
	}

	.completion {
		padding: 0 20px;
	}
</style>