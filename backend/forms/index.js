const handler = {
	'forms': {},

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

const getForm = function(params) {
	//get the classification parameters
	let service = params.service,
	category = params.category,
	subcategory = params.subcategory;

	//check the forms object for the service
	if(service in handler.forms) {
		//get the form by category and subcategory
		let form = handler.forms[service].find(form => (form.category == category && form.subcategory == subcategory)) ;
		//return the form
		if(form) {
			return form;
		} else {
			return null;
		}
	} else {
		return null;
	}
}

module.exports = { 'handler': handler, 'getForm': getForm };