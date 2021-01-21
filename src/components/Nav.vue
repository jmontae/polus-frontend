<script>
	export default {
		name: 'Nav',
		methods: {
			openMenu() {
				var node = document.getElementById("nav-links"),
				class_string = node.className
				if ( !class_string.includes('responsive') ) {
					class_string += " responsive"
					node.className = class_string
				} else {
					node.className = class_string.replace(/responsive/g, '' )
				}
			},
			login() {
				console.log( this.$serverURL )
				fetch(`${this.$serverURL}/login`)
				.then( response => {
					response.json()
				}).then( response => {
					console.log( response )
				})
			}
		}
	}
</script>

<template>
<header class="bg-gray-800 p-3">
	<nav class='nav flex items-start justify-between' id="nav">
		<div class="nav-left"><a class="logo-link" :href="this.$baseURL"><img class="h-8" src="../assets/ATEC-white.png" alt="ATEC.IO"></a></div>
		<div class='nav-links inlne-block' id="nav-links">
			<button type='button' class=' text-gray-500'>
				<div v-on:click="openMenu"><a class="icon fill-current"><i class="fa fa-bars"></i></a></div>
			</button>
			<a class="link inline-block mx-3 py-1 px-2 rounded inline-block text-white hover:bg-gray-700" href="https://www.utdallas.edu" target="blank">Go to UTD.EDU</a>
			<a class="link inline-block mx-3 py-1 px-2 rounded inline-block text-white hover:bg-gray-700" href="https://atecio.utdallas.edu" target="blank">Go to ATEC.IO</a>
			<button type='button' class='link mx-3 py-1 px-2 rounded inline-block text-white hover:text-black bg-purple-700 hover:bg-white' @click="login()">Login</button>
		</div>
	</nav>
	<div>
	</div>
</header>
</template>

<style scoped>
header {
	z-index: 99;
	position: fixed;
	width: 100vw;
}
.nav-links .link {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  text-decoration: none;
  
}

@media screen and (max-width: 600px) {
  .nav-links .link {display: none;}
  .nav-links a.icon {
    float: right;
    display: block;
  }
}

.nav-links .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .nav-links.responsive  {position: relative;}
  .nav-links.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  } 
  .nav-links.responsive .link {
	margin: 20px 0;
    float: none;
    display: block;
    text-align: left;
  }
}
</style>