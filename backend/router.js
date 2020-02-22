module.exports = (app, cherwell, forms) => {

	/*********
	* get /form/:service/:category/:subcategory
	* gets the form for the category requested
	**********/
	app.get('/form/:service/:category/:subcategory', (req, res) => {
		//search the catalogs for the subcategory
		let service = req.params.service,
		category = req.params.category,
		subcategory = req.params.subcategory;

		let result = cherwell.isSubcategory(subcategory);
		//if it exists, search for the form
		if(result.found) {
			let form = forms.getForm({ service, category, subcategory });
			//if a form exists, send it back
			if(form) {
				console.log('form found. sending to client');
				console.log(form);
				res.status(200).send(form);
			} else {
				//if not, send a generic form
				console.log('form not found. sending 404 to client');
				res.status(404).send(`request failed. Form not found for ${service} > ${category} > ${subcategory}`);
			}
		} else {
			console.log(`form requested, but the service ${service} doesn't exist`);
			res.status(404).send(`request failed. Service "${service}" not found.`);
		}	
	});

	/**********
	* get: /new_session
	* called whenever someone visits the help page. used for checking for and retrieving an access token
	**********/
	app.get('/new_session', (req, res) => {
		//check if there's an access_token available at all, or if it's expired
		console.log('new session started');
		if( cherwell.access_token == "" ) {
			//if there isn't one or it's expired, get a new one
			cherwell.requestToken().then( () => {
				//send back a 200 status if successful
				console.log("access token receieved.");
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
		console.log('form submission received');
		console.log('processing form...');

		try {
			//check for the subcategory
			let result = cherwell.isSubcategory(data.subcategory);
			//if found, process the formData
			if(result.found) {
				//parse the form data and generate the HTML
				cherwell.processFormData(data).then((formData) => {
					console.log('form processed');
					console.log('creating business object...');
					//create the object
					cherwell.createObject(result.type, formData).then( (busobj) => {
						console.log('object created');
						console.log('submitting to cherwell...');
						//submit the object to Cherwell
						cherwell.submitObject(busobj).then( (response) => {
							console.log('object submitted successfully');
							console.log(response);
							res.status(200).send(response);
						})
						.catch(error => { console.log(error); res.status(500).send(error); })
					})
					.catch(error => { console.log(error); res.status(500).send(error); });
				})
				.catch( error => { console.log(error); res.status(500).send(error); });
			} else {
				//if not found, this shouldn't exist. send back a 500
				res.status(500).send("there was an error: this form shouldn't exist.");
			}
		} catch(error) {
			console.log('an error occured.');
			res.status(500).send(error);
		}
	});

	/**********
	* post /submit/:object_name
	* when a user clicks submit, it hits this endpoint. the server will make a post request to Cherwell
	* with the data
	**********/
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

}