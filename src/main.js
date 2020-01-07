import Vue from 'vue'
import App from './App.vue'
import Router from "vue-router"

//components for routes
import routes from "./router"

//bulma css
import "bulma/css/bulma.css"
import "@fortawesome/fontawesome-free/css/all.css"

Vue.config.productionTip = false;
Vue.use(Router);

const router = new Router({ routes }); 

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')

