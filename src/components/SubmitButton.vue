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
			url: function() {
				return `${this.$serverURL}/submit/form`;
			}
		},
		mounted: function() {
				//get the total number of queries
				this.totalQueries = this.form.queries.length;

		},
		methods: {
			submit() {
				fetch(this.url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.form) })
					.then((response) => {
						this.auth = false
						//set the user's NetID in the form object
						let netid = this.form.fields.find(el => el.name == "NetID")
						netid.value = this.username

						if(response.status == 200) {
							this.submit_success = true, this.auth = false
							console.log(response);
						} else {
							this.submit_success = false, this.auth = false
							console.log(response);
						}
					})
			},
			authenticate() {
				fetch(`${this.$serverURL}/auth`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify( { username: this.username, password: this.password }) })
				.then( response => {

					if(response.status == 200) {
						//submit the form
						let auth_details = document.getElementById('auth_details')
						auth_details.innerHTML = '<h4 style="color: green">Sending form...</h4>'
						this.submit()
					} else { 
						this.auth_fail = true
						let auth_details = document.getElementById('auth_details')
						auth_details.innerHTML = `<h4 style="color: red">Couldn't authenticate. Please try again.</h4>`

						console.log(response)
					}
				})

			},
			finish() {
				let completion_text = document.getElementById("completion");
				completion_text.innerHTML = "please wait...";
				this.visible = true, this.auth = true
			},
			close() {
				this.visible = false;
				if( this.submit_success ) { location.reload() }
			}
		}
	}
</script>
	
<template>
	<div class="submit">
		<button class="submit_button" type="button" @click="finish">Finish</button>
		<div id="completion" class="completion">{{ answered }}/{{ form.queries.length }} answered</div>
		<div class="success-fail" v-if="visible">
			<div class="success-fail_message">
				<div id="auth" class="auth" v-if='auth'>
					<h3>Please enter your NetID and password</h3>
					<p id="auth_details"></p>
					<h4 class="query_text">NetID</h4>
					<input type="text" v-model="username" placeholder="...">
					<h4 class="query_text">Password</h4>
					<input type="password" v-model="password" placeholder="...">
					<div id="auth_button" class="auth_button"><button type="button" @click="authenticate">LOG IN</button></div>
				</div>
				<div id="success" v-else-if="submit_success">
					<p id='success'>Your request has been submitted successfully.</p>
					<div class="success_button"><button type="button" @click="close">OK</button></div>
				</div>
				<div id="fail" v-else>
					<p>Your request was not submitted. Please try again. If it happens again, let us know at atec_tech@utdallas.edu.</p> 
					<div class="success_button"><button type="button" @click="close">OK</button></div>
				</div>
			</div>
		</div>
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