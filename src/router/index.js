import Home from "../components/Home.vue"
import EmailRedirect from "../components/EmailRedirect.vue"

const routes = [
	{ path: '/', component: Home },
	{ path: '/help/:service/:category/:subcategory', component: EmailRedirect }
];

export default routes;