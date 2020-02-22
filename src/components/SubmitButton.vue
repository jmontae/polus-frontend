<script>
	export default {
		name: "SubmitButton",
		props: ['form'],
		computed: {
			url: function() {
				return `${this.$serverURL}/submit/form`;
			}
		},
		methods: {
			submitForm() {
				fetch(this.url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.form) })
				.then((response) => {
					console.log(response);
				})
			}
		}
	}
</script>
	
<template>
	<button type="button" @click="submitForm">Submit</button>
</template>

<style>
</style>