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

Vue.prototype.$serverURL = process.env.VUE_APP_SERVER_BASEURL;
Vue.prototype.$baseURL = process.env.VUE_APP_BASEURL;

const router = new Router({ base: '/help/', mode: 'history', routes });

new Vue({
	router,
  render: h => h(App)
}).$mount('#app')