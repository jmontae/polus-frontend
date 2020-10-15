import Home from "../views/Home.vue"
import Dashboard from "../views/Dashboard.vue"
import TicketView from "../views/Ticket.vue"
import TaskView from "../views/Task.vue"
import FormComponent from "../views/Form.vue"
import CatalogComponent from "../views/Catalog.vue"
import FormMaker from "../views/FormMaker.vue"
import Login from "../components/Login.vue"

const routes = [
	{ path: '/', component: Home },
	{ path: '/dashboard', component: Dashboard },
	{ path: '/ticket/:id', component: TicketView },
	{ path: '/task/:id', component: TaskView },
	{ path: '/catalog', component: CatalogComponent },
	{ path: '/catalog/:type/:service', component: CatalogComponent },
	{ path: '/catalog/:type/:service/:category', component: CatalogComponent },
	{ path: '/form/:tenant/:service/:category/:subcategory', component: FormComponent },
	{ path: '/formmaker', component: FormMaker },
	{ path: '/login', component: Login }

];

export default routes;