<template>
	<div class="email_form">
		<h2 class="email_form-title">{{ service }} / {{ category }} / {{ subcategory }}</h2>
		<textarea class='textarea' rows="10" v-model='description' placeholder="Enter the details here..."></textarea>
		<a class="button" :href="mailTo">Submit</a>
	</div>
</template>

<script>
	export default {
		name: 'EmailForm',
		props: [ 'service', 'category', 'subcategory', 'description' ],
		created: function() {
			this.service = this.$route.params.service;
			this.category = this.$route.params.category;
			this.subcategory = this.$route.params.subcategory;
		},
		computed: {
			body: function() {
				return this.description;
			},
			subject: function() {
				return this.service + " / " + this.category + " / " + this.subcategory;
			},
			mailTo: function() {
				return `mailto:ATECSupport@utdallas.edu?subject=${this.subject}&body=${this.body}`;
			}
		}
	}
</script>

<style>
.email_form-title {
	padding: 20px 0;
}
</style>
