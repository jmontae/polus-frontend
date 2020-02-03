module.exports = {
	'name': 'PurchaseRequest',
	'service': 'Procurement',
	'category': 'Purchasing',
	'subcategory': 'Purchase Request',
	'type': 'HRCase',

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

