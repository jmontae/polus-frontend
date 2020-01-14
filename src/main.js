//environment variables
import Vue from 'vue'
import App from './FullApp.vue'
import Router from "vue-router"
//import the Cherwell class
import Cherwell from "./logic/cherwell"
//components for routes
import routes from "./router"

//bulma css
import "bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.css"

Vue.config.productionTip = false;
Vue.use(Router);

const router = new Router({ routes });

//add it to the vue object for use in components
Object.defineProperty(Vue.prototype, '$cherwell', 
	{ value: new Cherwell({
			user: process.env.VUE_APP_API_USER,
			password: process.env.VUE_APP_API_PASSWORD,
			client_id: process.env.VUE_APP_API_CLIENT_ID,
			base_url: process.env.VUE_APP_API_BASEURL
		}) 
});

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')

