<script>
	export default {
		name: "SubmitButton",
		data() {
			return {
				success: false,
				visible: false
			}
		},
		props: ['form', 'answered'],
		computed: {
			url: function() {
				return `${this.$serverURL}/submit/form`;
			}
		},
		methods: {
			submitForm() {
				let completion_text = document.getElementById("completion");
				completion_text.innerHTML = "sending, please wait...";

				fetch(this.url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.form) })
				.then((response) => {
					if(response.status == 200) {
						this.success = true;
						this.visible = true;
						console.log(response);
					} else {
						this.success = false;
						this.visible = true;
						console.log(response);
					}
				}).catch();
			},
			close() {
				this.visible = false;
				location.reload();
			}
		}
	}
</script>
	
<template>
	<div class="submit">
		<button class="submit_button" type="button" @click="submitForm">Submit</button>
		<div id="completion" class="completion">{{ answered }}/{{ form.queries.length }} answered</div>
		<div class="success-fail" v-if="visible">
			<div class="success-fail_message">
				<p v-if='success'>Your request has been submitted successfully.</p>
				<p v-else>Your request was not submitted. Please try again. If if happens again, let us know at atec_tech@utdallas.edu.</p> 
				<div class="success_button"><button type="button" @click="close">OK</button></div>
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
		width: 300px;
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

	.completion {
		padding: 0 20px;
	}
</style>