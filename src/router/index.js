import Home from "../components/Home.vue"
import EmailRedirect from "../components/EmailRedirect.vue"

const routes = [
	{ path: '/', component: Home },
	{ path: '/:service/:category/:subcategory', component: EmailRedirect }
];

export default routes;