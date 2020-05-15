<script>
	import Nav from "./components/Nav.vue"

	export default {
		name: 'app',
		components: { Nav }
	}
</script>

<template>
	<div class='app'>
		<Nav />
		<div class='container'>
			<router-view />
		</div>
	</div>
</template>

<style>
.app {
	
}

.container {
	padding-top: 40px;
	display: flex;
	justify-content: center;
	align-content: center;
	margin: 0 20px;
}
</style>
