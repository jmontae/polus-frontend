export default class Query {
	key = null;
	queryType = 'text';
	queryText = "";
	response = "N/A";
	responseType = 'string';
	options = [];

	constructor(queryText, key = null, queryType = 'text', responseType = 'string', options = []) {
		this.queryText = queryText;
		this.key = key;
		this.queryType = queryType;
		this.responseType = responseType;
		this.options = options;
	}

	get queryText() {
		return this._queryText;
	}

	set queryText(querytext) {
		if(querytext == "") {
			// console.error('no queryText given. Please provide a queryText.');
		} else {
			this._queryText = querytext;
			// console.log(`QueryText added: ${this._queryText}`);
		}
	}

	set key(val) {
		if( typeof key != "number" ) {
			// console.error('key value is not a number');
		} else {
			this._key = val;
		}
	}

	get key() {
		return this._key;
	}

	set queryNumber(num) {
		if( typeof num != "number" ) {
			// console.error('value for queryNumber is not a number.');
		} else {
			this._queryNumber = num;
		}
	}

	get response() {
		return this._response;
	}

	set response(res) {
		if( typeof res !== this.responseType && this.responseType == ( "string" || "number" )  ) {
			alert(`The query "${this._queryText}" needs a ${this._responseType} value.`);
		} else {
			this._response = res;
		}
	}

	set queryType(type) {
		if( type == '') {
			// console.error('no type given. Please provide a type.');
		} else { 
			this._queryType = type; 
			// console.log(`The query "${this._queryText}" was given a type of [${this._queryType}].`);
		}
	}

	get queryType() {
		return this._queryType;
	}

	set options(options) {
		if( typeof options != Array ) {
			// console.error("no options given. options must given in form of an array.");
		} else {
			this._options = options;
			// console.log(`The query ${this._queryText} has these options: ${this._options}.`);
		}
	}	

	get options() {
		return this._options;
	}
}
