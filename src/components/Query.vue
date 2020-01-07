<template>
	<div class="query" v-if="isCheckOrRadio">
		<h3 class="query_text">{{ queryText }}</h3>
		<div class="query_response">
			<div class='option' v-for="(option, index) in options" :key="index">
				<input :type="queryType" :id="index" :value="option" v-model='response'>
				<label :for="option"> {{ option }}</label>
			</div>
		</div>
	</div>
	<div class="query" v-else>
		<h3 class="query_text">{{ queryText }}</h3>
		<div class="query_response">
			<input v-model="response" placeholder="Your Name">
		</div>
	</div>
</template>

<script>
export default {
	name: "QueryComponent",
	props: {
		queryText: String,
		queryType: String,
		response: [ String, Array ],
		responseType: String,
		options: Array
	},
	computed: {
		isCheckOrRadio: function() {
			return this.queryType == "checkbox" || this.queryType == "radio";
		}
	}
}
</script>

<style>

</style>