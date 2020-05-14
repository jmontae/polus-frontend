module.exports = {
	'name': 'PurchaseRequest',
	'type': 'HRCase',
	'title': 'Purchase Request Form',
	'details': "Use this form for submitting a purchasing request. Please answer all questions before clicking submit.",
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
		},
		{
			'name': "NetID",
			'value': 'null'
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
			'subqueries': [
				{
					'type': 'text',
					'text': 'What is your name?'
				}
			]

		}
	]
}

