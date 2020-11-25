import Vue from 'vue'
import App from './App.vue'
import Router from "vue-router"

//components for routes
import routes from "./router"

//css
import "@fortawesome/fontawesome-free/css/all.css"
import "./base.css"
// import { Tree } from './logic/tree'

Vue.config.productionTip = false;
Vue.use(Router);

const router = new Router({ base: '/helpdev/', mode: 'history', routes });

new Vue({
	router,
	beforeCreate: async function() {

		// let catalogIncident = await fetch(`${this.$serverURL}/s/ui/catalogs/ATEC/incident`)
      //    .then( response => response.json() )
      //    .then( catalog => { return catalog.tree }),
         
      //    catalogHRcase = await fetch( `${this.$serverURL}/s/ui/catalogs/ATEC/hrcase` )
      //    .then( response => response.json() )
      //    .then( catalog => { return catalog.tree })

		// Vue.prototype.$catalog = {
		// 	incident: new Tree( catalogIncident._root ),
		// 	hrcase: new Tree( catalogHRcase._root )
		// }
		Vue.prototype.$serverURL = process.env.VUE_APP_SERVER_BASEURL
		Vue.prototype.$baseURL = process.env.VUE_APP_BASEURL
	},
  render: h => h(App)
}).$mount('#app')