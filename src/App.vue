<script>
	import Nav from "./components/Nav.vue"

	export default {
		name: 'app',
		components: { Nav },
		created: function() {
			
		}
	}
</script>

<template>
	<div class='app'>
		<Nav />
		<div class="router">
			<router-view />
		</div>
	</div>
</template>

<style>
.router {
	padding-top: 50px;
	z-index: -1;
}
</style>
