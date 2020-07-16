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
			<router-view />
	</div>
</template>

<style>
.app {
	
}

</style>
