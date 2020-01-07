require('dotenv').config();
let Cherwell = require('./cherwell');

const express = require('express'),
			path = require('path'),
			bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//create the Cherwell object for use on the server
const cherwell = new Cherwell({
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	client_id: process.env.CLIENT_ID,
	base_url: process.env.BASEURL
});

app.get('/', (req, res) => {
	
});

app.get('/form/:service/:category/:subcategory', (req, res) => {

});

app.post('/submit', (req, res) => {
	//parse the request body
	let body = req.body;
	console.log("submit request received.");
	console.log(body);

	cherwell.getToken().then(() => {
		//create the object
		cherwell.createObject(body.object_type, body.fields).then((obj) => {
			//then send it to Cherwell
			console.log("object created");
			console.log(obj);
			cherwell.submitObject(body).then( () => {
				//when resolved, send back a 200 status
				console.log("object submitted");
				res.status(200).end();
			}).catch(error => { console.log(error.message); res.status(500).end(); });
		}).catch(error => { console.log(error.message); res.status(500).end(); });
	}).catch(error => { console.log(error.message); res.status(500).end(); });
});

let server = app.listen(4000, () => {
	console.log('server listening on port 4000');
});