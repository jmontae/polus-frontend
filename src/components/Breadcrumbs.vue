<script>

export default {
	name: 'Breadcrumbs',
	props: ['root', 'service', 'category', 'subcategory'],
	computed: {
		hasService: function() {
			let check = this.service.length > 0 ? true : false;
			return check;
		},
		hasCategory: function() {
			let check = this.category.length > 0 ? true : false;
			return check;
		},
		hasSubcategory: function() {
			let check = this.subcategory.length > 0 ? true : false;
			return check;
		},
		rootLink: function() {
			return this.root;
		},
		serviceLink: function() {
			return `${this.root}/${this.service}`
		},
		categoryLink: function() {
			return `${this.root}/${this.service}/${this.category}`
		},
		subcategoryLink: function() {
			return `${this.root}/${this.service}/${this.category}/${this.subcategory}`
		}
	}
}
</script>

<template>
	<div class="breadcrumbs">
		<div class="crumb"><a :href="rootLink">Home</a></div>
		<div v-if="hasService" class='crumb'><span class="arrow">>></span><a :href="serviceLink">{{ service }}</a></div> 
		<div v-if="hasCategory" class='crumb'><span class="arrow">>></span><a :href="categoryLink">{{ category }}</a></div> 
		<div v-if='hasSubcategory' class='crumb'><span class="arrow">>></span><a :href="subcategoryLink">{{ subcategory }}</a></div>
	</div>
</template>

<style>
	.breadcrumbs {
		padding: 10px;
		border: solid .5px #ddd;
	}
	.crumb {
		display: inline-block;
	}

	.crumb .arrow, .crumb a {
		padding-right: 10px;
		text-decoration: none;
	}
</style>