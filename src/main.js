import Vue from 'vue'
import App from './App.vue'
import Router from "vue-router"

//components for routes
import routes from "./router"

//css
import "@fortawesome/fontawesome-free/css/all.css"
import "./base.css"

Vue.config.productionTip = false;
Vue.use(Router);


Vue.prototype.$incidentCatalog = {};
Vue.prototype.$hrcaseCatalog = {};
Vue.prototype.$serverURL = process.env.VUE_APP_SERVER_BASEURL;
Vue.prototype.$baseURL = process.env.VUE_APP_BASEURL;

const router = new Router({ base: '/helpdev/', mode: 'history', routes });

new Vue({
	router,
	beforeCreate: function() {
		//get the incident catalog
		fetch(`${this.$serverURL}/catalog/incident`).then((response) => {
				if( response.status == 200 ) {
					return response.json();
				}
		}).then((json) => {
			this.$incidentCatalog = json;
		});
		//and the HRCase catalog
		fetch(`${this.$serverURL}/catalog/HRCase`).then((response) => {
				if( response.status == 200 ) {
					return response.json();
				}
		}).then((json) => {
			
			this.$hrcaseCatalog = json;
		});
	},
  render: h => h(App)
}).$mount('#app')