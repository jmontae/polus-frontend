<template>
	<div class="redirect"></div>
</template>

<script>
export default {
	name: 'EmailRedirect',
	props: [ 'service', 'category', 'subcategory', 'description' ],
	created: function() {
		this.service = this.$route.params.service;
		this.category = this.$route.params.category;
		this.subcategory = this.$route.params.subcategory;

		window.location.href = this.mailTo;
	},
	computed: {
		teamName: function() {
			if(this.service == "Events" || this.service == "Facilities") {
				return 'ATEC Events and Facilities';
			} else { return `ATEC ${this.service}` }
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
		mailTo: function() {
			return `mailto:atec.atlas@utdallas.edu?subject=${this.subject}&body=${this.body}`;
		}
	}
}
</script>

<style>
</style>