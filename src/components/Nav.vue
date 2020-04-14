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
	<nav class='nav' id="nav">
		<div class="nav-left"><a class="logo-link" :href="this.$baseURL"><img src="../assets/ATEC-white.png" alt="ATEC.IO"> <span>Help</span></a></div>
		<div v-on:click="openMenu"><a class="icon"><i class="fa fa-bars"></i></a></div>
		<div class='nav-links' id="nav-links">
			<a class="link" href="https://www.utdallas.edu" target="blank">Go to UTD.EDU</a>
			<a class="link" href="https://atecio.utdallas.edu" target="blank">Go to ATEC.IO</a>
		</div>
	</nav>
</template>

<style>
	.nav {
		position: relative;
		overflow: hidden;
		width: 100vw;
		background-color: #333;
	}

	.nav a.active {
		color: #f2f2f2;
	}

	.logo-link {
		float: left;
		display: inline;
		padding: 12px 16px;
		text-align: center;
		justify-content: center;
		text-decoration: none;
		text-transform: uppercase;
		color: #f2f2f2;
	}

	.nav-left img {
		height: 20px;
		width: auto;
	}

	a.icon:hover, .nav-links a:hover {
		background-color: #ddd;
	}

	.nav-links {
		display: block;
	}

	.nav .link {
		float: right;
		display: block;
		text-decoration: none;
		padding: 14px 16px;
		text-align: center;
		text-transform: uppercase;
		color: #f2f2f2;
	}

	.nav a.icon {
		display: none;
		text-decoration: none;
		padding: 14px 16px;
		text-align: center;
		color: #f2f2f2;
	}

	.nav a.icon:hover {
		color: black;
	}

	@media screen and (max-width: 600px) {
		.nav-links .link { display: none; }
		.nav a.icon {
			float: right;
			display: block;
		}
	}

	@media screen and (max-width: 600px) {
	.nav.responsive { position: relative; }
  .nav.responsive .nav-links .link {
    float: none;
    display: block;
    text-align: right;
    border-bottom: solid .5px #ddd;

  }

  .nav.responsive .nav-links {
  margin-top: 50px;
  }
}
</style>