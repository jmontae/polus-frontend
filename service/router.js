const fs = require('fs')
// passport = require('passport'),
// ldap = require('passport-ldapauth'),
// ldap_admin = process.env.LDAP_ADMIN,
// ldap_password = process.env.LDAP_PASSWORD

// options = {
// 	server: {
// 		url: 'ldap://campus.ad.utdallas.edu',
// 		bindDN: `cn={{username}},ou=people,dc=campus,dc=ad,dc=utdallas,dc=edu`,
// 		bindCredentials: `{{password}}`,
// 		searchBase: `ou=people,dc=campus,dc=ad,dc=utdallas,dc=edu`,
// 		searchFilter: `(user={{username}})` //,
// 		// tlsOptions: {
// 		// 	ca: [
// 		// 		fs.readFileSync('')
// 		// 	]
// 		// }
// 	}
// }

// passport.use(new ldap( options ))


module.exports = (app, cherwell, forms) => {

	app.post('/auth', /*passport.authenticate('ldapauth', {session: false}),*/ (req, res) => {
		// console.log('request: ', req)
		// console.log('response: ', res)
		res.status(200).end()
	})

	/*********
	* get /form/:service/:category/:subcategory
	* gets the form for the category requested
	**********/
	app.get('/form/:service/:category/:subcategory', (req, res) => {
		//search the catalogs for the subcategory
		let service = req.params.service,
		category = req.params.category,
		subcategory = req.params.subcategory;
		//get the form needed
		cherwell.getForm({service, category, subcategory}, (err, form) => {
			//if there's a form, send it
			if(form) {
				res.status(200).send(form);
			} else {
				//if not, it's likely an error. send the status and message back
				res.status(err.status).send(err.message);
			}
		});
	});

	/**********
	* get: /new_session
	* called whenever someone visits the help page. used for checking for and retrieving an access token
	**********/
	app.get('/new_session', (req, res) => {
		//check if there's an access_token available at all, or if it's expired
		console.log('service/router.js[GET /new_session]: new session started');
		if( cherwell.access_token == "" ) {
			//if there isn't one or it's expired, get a new one
			cherwell.requestToken().then( () => {
				//send back a 200 status if successful
				console.log('service/router.js[GET /new_session]: access token received.');
				res.status(200).send();
			}).catch( error => { 
				//send a 500 status if not, with the error
				console.log(error);
				res.status(500).send(error);
			});
		} else { res.status(200).send(); }
	
	});

	app.post('/submit/form', (req, res) => {
		let data = req.body;
		console.log('service/router.js[POST /submit/form]: form submission received. processing form...')

		try {
			//parse the form data and generate the HTML
			cherwell.processFormData(data).then((formData) => {
				console.log('service/router.js[POST /submit/form]: form processed. creating business object...')
				//create the object
				cherwell.createObject(data.type, formData).then( (busobj) => {
					console.log('service/router.js[POST /submit/form]: object created. submitting to cherwell...')
					//submit the object to Cherwell
					cherwell.submitObject(busobj).then( (response) => {
						console.log('service/router.js[POST /submit/form]: object submitted successfully');
						console.log(response);
						res.status(200).send(response);
					})
					.catch(error => { console.log(error); res.status(500).send(error); })
				})
				.catch(error => { console.log(error); res.status(500).send(error); });
			})
			.catch( error => { console.log(error); res.status(500).send(error); });
		} catch(error) {
			console.log('service/router.js[POST /submit/form]: an error occured.');
			console.log(error);
			res.status(500).send(error);
		}
	});

	/**********
	* post /submit/:object_name
	* when a user clicks submit, it hits this endpoint. the server will make a post request to Cherwell
	* with the data
	**********/
	app.post('/submit/:object_name', (req, res) => {
		console.log("service/router.js[POST /submit/object_name]: submit request received.");
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
					console.log('service/router.js[POST /submit/object_name]: object submitted successfully');
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

	app.get('/catalog/:type', (req, res) => {
		if(req.params.type.toLowerCase() == "incident") {
			res.status(200).send(cherwell.incidentCatalog);
			console.log("service/router.js[GET /catalog/type]: incident catalog sent");
		}
		else if(req.params.type.toLowerCase() == "hrcase") {
			res.status(200).send(cherwell.hrCaseCatalog);
			console.log("service/router.js[GET /catalog/type]: HR Case catalog sent");
		} else { res.status(500).send("this catalog type does not exist"); }
	});
}