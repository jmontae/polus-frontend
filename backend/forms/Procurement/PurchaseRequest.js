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
			'text': 'Would you like to give your name?',
			'options': ['yes', 'no'],
			'hasSubqueries': true,
			'subqueries': [
				{
					'type': 'text',
					'text': 'What is your name?'
				}
			]

		}
	]
}

