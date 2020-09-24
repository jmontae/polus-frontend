<script>
	export default {
		name: 'Nav',
		methods: {
			openMenu() {
				var x = document.getElementById("nav");
				if (x.className === "nav") {
					x.className += " responsive";
				} else {
					x.className = "nav";
				}
			}
		}
	}
</script>

<template>
<header class="bg-gray-800 p-3">
	<nav class='nav flex items-start items-center justify-between' id="nav">
		<div class="nav-left"><a class="logo-link" :href="this.$baseURL"><img class="h-8" src="../assets/ATEC-white.png" alt="ATEC.IO"></a></div>
		<div class='nav-links inlne-block' id="nav-links">
			<a class="link inline-block mx-3 py-1 px-2 rounded inline-block text-white hover:bg-gray-700" href="https://www.utdallas.edu" target="blank">Go to UTD.EDU</a>
			<a class="link inline-block mx-3 py-1 px-2 rounded inline-block text-white hover:bg-gray-700" href="https://atecio.utdallas.edu" target="blank">Go to ATEC.IO</a>
			<a class='mx-3 py-1 px-2 rounded inline-block text-white hover:text-black bg-purple-700 hover:bg-white' href="/login">Login</a>
			<button type='button' class='mx-3 text-gray-500 inline-block'>
				<div v-on:click="openMenu"><a class="icon h-4 w-4 fill-current"><i class="fa fa-bars"></i></a></div>
			</button>
		</div>
	</nav>
	<div>
	</div>
</header>
</template>

<style scoped>
header {
	position: fixed;
	width: 100vw;
}
</style>