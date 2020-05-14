<script>
	export default {
		name: 'CatalogItem',
		props: [ 'value' ]
	}
</script>

<template>
	<div class="catalog_item">
			<h4>{{ value.toUpperCase() }}</h4>
		</div>
</template>

<style>
.catalog_item {
	min-width: 25%;
	border: .5px solid #000;
	margin-bottom: 10px;
	padding: 10px;
	flex: 0 0 30%;
}
</style>