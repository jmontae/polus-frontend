import Vue from 'vue'
import App from './App.vue'
import Router from "vue-router"

//components for routes
import routes from "./router"

//css
import "@fortawesome/fontawesome-free/css/all.css"
import "./base.css"
import { Tree } from './logic/tree'

Vue.config.productionTip = false;
Vue.use(Router);

const router = new Router({ base: '/helpdev/', mode: 'history', routes });

new Vue({
	router,
	created: async function() {

		Vue.prototype.$serverURL = process.env.VUE_APP_SERVER_BASEURL
		Vue.prototype.$baseURL = process.env.VUE_APP_BASEURL
		Vue.prototype.$catalog = {
			incident: null,
			hrcase: null
		}

		let catalogIncident = await fetch(`${this.$serverURL}/s/ui/catalogs/ATEC/incident`)
         .then( response => response.json() )
			.then( catalog => { 
				return catalog.tree }),
         
         catalogHRcase = await fetch( `${this.$serverURL}/s/ui/catalogs/ATEC/hrcase` )
         .then( response => response.json() )
         .then( catalog => { 
				return catalog.tree })

		//set the catalogs
		Vue.prototype.$tenant = 'ATEC'
		Vue.prototype.$catalog.incident = new Tree( catalogIncident._root )
		Vue.prototype.$catalog.hrcase= new Tree( catalogHRcase._root )

	},
  render: h => h(App)
}).$mount('#app')