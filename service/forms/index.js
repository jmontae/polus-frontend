const handler = {
	'forms': { 'defaults': [] },

	'add': function (obj) {
		//get the classification parameters
		let name = obj.name.toLowerCase();
		if(name.includes('default')) {
			this.forms.defaults.push(obj);
			console.log(`>>> form added to defaults: ${obj.name}`);

		} else {
			let service = obj.service,
			category = obj.category,
			subcategory = obj.subcategory,
			queries = obj.queries;
			//add the form to the object
			if(!this.forms.hasOwnProperty(service)) {
				this.forms[service] = new Array();
			}

			this.forms[service].push(obj);
			console.log(`>>> form added to ${service}: ${obj.name} (${category} > ${subcategory})`);
		}

		return this;
	}
}

module.exports = handler;