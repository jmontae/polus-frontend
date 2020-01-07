<template>
	<div class="form">
		<QueryComponent v-for="(query, index) in queries" :key="index" v-bind="query" @dataChange='handleData' />
	</div>
</template>

<script>
	// import Query from '../logic/Query.js';
	import QueryComponent from "./Query.vue";

	export default {
		name: "FormComponent",
		props: ["queries"],
		components: { QueryComponent }//,
		// methods: {
		// 	handleData: function(key, data) {
		// 		let qry = this.queries.find(query => query.key == key);
		// 		qry.queryResponse = data;
		// 		this.queries = this.queries.map(qry => queries.query.key)
		// 	}
		// }
	}
</script>

<style>

</style>