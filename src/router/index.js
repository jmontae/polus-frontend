import Home from "../components/Home.vue"
import FormComponent from "../components/Form.vue"

const routes = [
	{ path: '/', component: Home },
	{ path: '/:service/:category/:subcategory', component: FormComponent }
];

export default routes;