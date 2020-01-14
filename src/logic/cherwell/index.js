let request = require('request');

module.exports = class Cherwell {
	access_token = '';
	refresh_token = '';
	expires_in = '';	
	#user = "";
	#password = "";
	#client_id = "";
	base_url = "";

	/*********
	constructor
	takes passed-in params and assigns them
	**********/
	constructor(params) {
		this.user = params.user;
		this.password = params.password;
		this.client_id = params.client_id;
		this.base_url = params.base_url;
	}

	/*********
	async getToken
	sends a request to Cherwell for an access token
	runs asynchronously, returning a Promise. if rejected, throws an error.
	**********/
	async requestToken() {
		return new Promise( (resolve, reject) => {
			
			//set options for the request call
			let options = {
				url: `${this.base_url}/token`,
				method: 'POST',
				headers: {
					'api-key': this.client_id,
					'Content-Type': 'x-www-form-urlencoded'
				},
				form: {
					grant_type: 'password',
					client_id: this.client_id,
					username: this.user,
					password: this.password,
				}
			};
			//send the request and set the promise based on the success or fail
			request(options, (err, res, body) => {
				//parse the body
				body = JSON.parse(body);
				//if it's successful, set the acces_token and resolve
				if(res.statusCode == 200) {
					this.access_token = body.access_token;
					this.refresh_token = body.refresh_token;
					this.expires_in = body.expires_in;
					resolve();
				}
				//if not, reject with the error that was sent
				else {
					reject({ status: res.statusCode, errorCode: body.errorCode, message: body.errorMessage });
				}
			});
		});
	}

	/*********
	checkToken
	checks for a token and if the access token has expired
	**********/
	async checkToken() {
		return new Promise( (resolve, reject) => {
			//check for a token or if it's expired
			if(this.access_token == "" /*|| expired*/) {
				//if it is, request a new one
				this.requestToken().then( () => {
				resolve();
			}).catch( error => {
					reject(error);
				});
			} else { resolve(); }
		});
	}

	/*********
	async getObjectId
	sends a GET request to Cherwell for the business object ID based on the object name
	runs asynchronously, returning a Promise. if resolved, it sends business object ID; if rejected, throws an error.
	
	params
		obj_name: name of the business object
	**********/
	async getObjectId(obj_name) {
		return new Promise( (resolve, reject) => {
			//set the options object for the request call
			let options = {
				url: `${this.base_url}/api/V1/getbusinessobjectsummary/busobname/${obj_name}`,
				method: 'GET',
				auth: {
					'bearer': this.access_token 
				}
			};

			//send the request and set the promise based on the success or fail 
			request(options, (err, res, body) => {
				//parse the body
				body = JSON.parse(body);
				//if the status isn't OK, reject with the error that was sent
				if(res.statusCode !== 200) {
					reject({ status: res.statusCode, errorCode: body.errorCode, message: body.errorMessage });
				}
				//if it is, resolve and send the ID
				else {
					resolve(body[0].busObId);
				}
			});
		});
	}

	/*********
	async getObjectTemplate
	sends a GET request to Cherwell for the business object template based on the object ID
	runs asynchronously, returning a Promise. if resolved, it sends business object template; if rejected, throws an error.
	
	params
		obj_id: the business object ID
		required: if set to true, Cherwell returns only the fields that are required. set to false by default 
	**********/
	async getObjectTemplate(obj_name, required = false, fields = []) {
		return new Promise( (resolve, reject) => {
			//get the object id
			this.getObjectId(obj_name).then( objid => { 
				//set the options for the request call
				let options = {
					url: `${this.base_url}/api/V1/getbusinessobjecttemplate`,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					auth: {
						bearer: this.access_token 
					},
					form: {
						busObId: objid,
						fields: fields,
						includeRequired: required,
						includeAll: !required
					}
				};

				//send the request and return the promise based on the success or fail
				request(options, (err, res, body) => {
					//parse the body
					body = JSON.parse(body);
					//if the status isn't OK, reject with the error that was sent
					if ( body.hasError ) {
						reject({ status: res.statusCode, errorCode: body.errorCode, message: body.errorMessage });
					} 
					//if it is, resolve and send the object ID and template
					else {
						resolve( {objId: objid, template: body} );
					}
				});
			}).catch( error => { reject(error); });		
		});
	}

	/*********
	async getFields
	sends requests to Cherwell for the fields based on the object name
	runs asynchronously, returning a Promise. if resolved, it sends the fields array; if rejected, throws an error.
	
	params
		obj_name: name of the business object
		required: if set to true, Cherwell returns only the fields that are required. set to true by default 
	**********/
	async getFields(obj_name, required = true) {
		return new Promise( (resolve, reject) => {
				//then get the object template based on the name
				this.getObjectTemplate(obj_name, required).then((result) => {
					//send the fields back
					resolve(result.template.fields);
				}).catch( error => { reject(error); });
		});
	}

	/*********
	async createObject
	creates the object to be sent to Cherwell
	runs asynchronously, returning a Promise. if resolved, it sends the created object; if rejected, throws an error.
	
	params
		obj_name: name of the business object
		data: the data for the object fields
	**********/
	async createObject(obj_name, data) {
		return new Promise( (resolve, reject) => {
			//first, get the object template
			this.getObjectTemplate(obj_name, true).then((result) => {
				//set the object values from the result
				let obj = { 
					busObId: result.objId,
					fields: result.template.fields,
					persist: true
				};
				//then set the field values from the data
				obj.fields.forEach(field =>  {
					data.fields.forEach(item => {
						if(item.name == field.name) {
							field.value = item.value;
						}
					});
				});
				//send the object back in the resolve
				resolve(obj);
			}).catch(error => { reject(error); });
		});
	}

	/*********
	async submitObject
	sends the object to Cherwell for creation
	runs asynchronously, returning a Promise. if rejected, throws an error.

	params
		obj: the business object to be submitted
		persist: if false, Cherwell will cache and send back a cache key. if true, Cherwell saves permanently. set to true by default.
	**********/
	async submitObject(obj, persist = true) {
		return new Promise( (resolve, reject) => {
			//set the persist value
			obj.persist = persist;
			//set the options for the request call
			let options = {
				url: `${this.base_url}/api/V1/savebusinessobject`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				auth: {
					bearer: this.access_token
				},
				form: obj
			};

			request(options, (err, res, body) => {
				body = JSON.parse(body);
				if( res.statusCode != 200 ) {
					let msg = body.Message ? body.Message : body.errorMessage;
					reject({ status: res.statusCode, errorCode: body.errorCode, message: msg });
				}
				else {
					resolve(body);
				}
			});
		});
	}
}