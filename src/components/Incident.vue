<template>
	<div class="form">
		<h3>First Name</h3>
		<input v-model="firstName" placeholder="First Name">
		<h3>Last Name</h3>
		<input v-model="lastName" placeholder='Last Name'>
		<h3>Email</h3>
		<input v-model="email" placeholder="Email">
		<h3>Please describe your problem:</h3>
		<input v-model="description" placeholder="Enter the details here">
	</div>
</template>

<script>
export default {
	name: 'Incident',
	props: {
		firstName: String,
		lastName: String,
		description: String,
		email: String,
		access_token: String
	},
	computed: {
		name: function() {
			return this.firstName + ' ' + this.lastName;
		}
	}//,
	// created: function() {
	// 	let url = 'https://utdallastest.cherwellondemand.com/CherwellAPI'
	// 	let promise = fetch()
	// }
}
</script>

<style>
</style>