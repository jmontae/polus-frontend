require('dotenv').config();
let Cherwell = require('./cherwell'),
		port = process.env.SERVER_PORT,
		body_parser = require('body-parser'),
		github_user = process.env.GITHUB_USER,
		cors = require('cors');

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
	console.log(`server listening on port ${port}`);
});

require('./router')(app, cherwell);
