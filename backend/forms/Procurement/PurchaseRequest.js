module.exports = {
	'name': 'PurchaseRequest',
	'title': 'Purchase Request Form',
	'service': 'Procurement',
	'category': 'Purchasing',
	'subcategory': 'Purchase Request',

	'fields': [
		{
			'name': 'OwnedByTeam',
			'value': 'ATEC Procurement'
		},
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
			'text': 'What is your name?'
		},
		{
			'type': 'radio',
			'text': 'What would you like to purchase?',
			'options': ['office supplies', 'software', 'hardware']

		}
	]
}

