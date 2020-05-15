module.exports = {
	'name': "DefaultHRCase",
	'type': "HRCase",
	'title': "Shared Service Ticket",

	'fields': [
		{
			'name': 'Priority',
			'value': '3'
		},
		{
			'name': 'CallSource',
			'value': 'Portal'
		}
	],

	'queries': [
		{
			'type': 'text',
			'text': 'Give a short description of your problem:',
			'fieldName': 'ShortDescription'
		},
		{
			'type': 'textarea',
			'text': "Explain your problem in as much detail as possible.",
			'fieldName': 'Description'
		}
	]

}