require('dotenv').config();
let Cherwell = require('../src/logic/cherwell'),
		port = process.env.SERVER_PORT,
		body_parser = require('body-parser'),
		github_user = process.env.GITHUB_USER;

const app = require('express')();
app.use(body_parser.json());

const cherwell = new Cherwell({
	user: process.env.CHERWELL_USER,
	password: process.env.CHERWELL_PASSWORD,
	client_id: process.env.CHERWELL_CLIENT_ID,
	base_url: process.env.CHERWELL_BASEURL
});

/**********
* get: /new_session
* called whenever someone visits the help page. used for checking for and retrieving an access token
**********/
app.get('/new_session', (req, res) => {
	//check if there's an access_token available at all, or if it's expired
	console.log('new session started');
	if( cherwell.access_token == "" || cherwell.checkExpiry() ) {
		//if there isn't one or it's expired, get a new one
		cherwell.requestToken().then( () => {
			//send back a 200 status if successful
			console.log("access token receieved.");
			res.status(200).send();
		}).catch( error => { 
			//send a 500 status if not, with the error
			res.status(500).send(error);
		});
	} else { res.status(200).send(); }
});

/**********
* post /submit
* when a user clicks submit, it hits this endpoint. the server will make a post request to Cherwell
* with the data
**********/
app.post('/submit', (req, res) => {
	console.log("submit request received.");
	let obj = req.body;
	console.log(obj);
	//check for the token or its expiration
	cherwell.checkToken().then( () => {
		//submit the object to Cherwell
		cherwell.submitObject(obj).then( (response) => {
			//if it's successful, send a 200 status with the response
			console.log('object submitted successfully');
			res.status(200).send(response);
		}).catch( error => {
			//if not, send back a 500 status with the error
			console.log(error); 
			res.status(500).send(error); 
		});
	});
});

app.post('/submit/:object_name', (req, res) => {
	console.log("submit request received.");
	let obj = req.body;
	console.log(obj);
	console.log(req.params);

	//check if the access token is expired
	cherwell.checkToken().then( () => {
		//create the object with the data received
		cherwell.createObject(req.params.object_name, obj).then( (busobj) => {
			//submit the object to Cherwell
			cherwell.submitObject(busobj).then( (response) => {
				//if it's successful, send a 200 status with the response
				console.log('object submitted successfully');
				res.status(200).send(response);
			}).catch( error => {
				//if not, send back a 500 status with the error
				console.log(error); 
				res.status(500).send(error); 
			});
		}).catch(error => {
			console.log(error);
			res.status(500).send(error);
		});
	}).catch(error => { console.log(error); res.status(500).send(error); });
});

/*********
* get /get/object
* gets the template for the business object requested
**********/
app.get('/get/:object', (req, res) => {
	//check if the access token is expired
	if( cherwell.access_token == "" /*|| cherwell.checkExpiry()*/ ) {
	//if it is, request a new one
	cherwell.requestToken().catch( error => {
			res.status(500).send(error);
		});
	}

	//get the object template
	cherwell.getObjectTemplate(req.params.object, true).then( (result) => {
		//send the object back with a 200 status
		res.status(200).send(result);
	}).catch( error => { 
		//if unsuccessful, send a 500 status with the error
		res.status(500).send(error); 
	});
});

app.get('/', (req, res) => {
	res.status(200).send('this is the cherwell app api endpoint. nothing to see here.');
});

app.listen(port, () => {
	console.log(`server listening on port ${port}`);
});