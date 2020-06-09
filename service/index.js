require('dotenv').config();
let Cherwell = require('./util/cherwell'),
		port = process.env.SERVER_PORT,
		github_user = process.env.GITHUB_USER;

let body_parser = require('body-parser'),
	cors = require('cors')


const app = require('express')();
app.use(body_parser.json());
app.use(cors());

const cherwell = new Cherwell({
	user: process.env.CHERWELL_USER,
	password: process.env.CHERWELL_PASSWORD,
	client_id: process.env.CHERWELL_CLIENT_ID,
	base_url: process.env.CHERWELL_BASEURL,
	tenant: process.env.CHERWELL_TENANT
});

app.listen(port, () => {
	console.log(`service/index.js: server listening on port ${port}`);
});

require('./router')(app, cherwell);
