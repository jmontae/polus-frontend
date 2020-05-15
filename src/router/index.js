import Home from "../components/Home.vue"
import FormComponent from "../components/Form.vue"
import CatalogComponent from "../components/Catalog.vue"

const routes = [
	{ path: '/', component: Home },
	{ path: '/catalog', component: CatalogComponent },
	{ path: '/catalog/:type/:service', component: CatalogComponent },
	{ path: '/catalog/:type/:service/:category', component: CatalogComponent },
	{ path: '/form/:service/:category/:subcategory', component: FormComponent }

];

export default routes;