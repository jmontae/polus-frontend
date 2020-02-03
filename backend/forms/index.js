const handler = {
	'forms': { 
		'general': {
			'type': 'textarea',
			'text': 'Please'
		}
	 },

	'add': function (obj) {
		//get the classification parameters
		let service = obj.service,
		category = obj.category,
		subcategory = obj.subcategory,
		queries = obj.queries;
		//add the form to the object
		if(!this.forms.hasOwnProperty(service)) {
			this.forms[service] = new Array();
		}

		this.forms[service].push(obj);
		console.log(`>>> added new form to ${service}: ${obj.name} (${category} > ${subcategory})`);

		return this;
	}
}

const getForm = function(request, response) {
		//get the classification parameters
		let service = request.params.service,
		category = request.params.category,
		subcategory = request.params.subcategory;

		//check the forms object for the service
		if(service in handler.forms) {
			//get the form by category and subcategory
			let form = handler.forms[service].find(form => (form.category == category && form.subcategory == subcategory)) ;
			//return the form
			if(form) {
				console.log('form found. sending to client');
				response.status(200).send(form);
			} else {
				//send a 404 back if it doesn't exist
				console.log('form not found. sending 404 to client');
				response.status(404).send(`request failed. Form not found for ${service} > ${category} > ${subcategory}`);
			}
		} else {
			//send a 404 back if the service doesn't exist
			console.log(`form requested, but the service ${service} doesn't exist`);
			response.status(404).send(`request failed. Service "${service}" not found.`);
		}
	}

module.exports = { 'handler': handler, 'getForm': getForm };