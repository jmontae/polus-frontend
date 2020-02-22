module.exports = {
	'name': 'BusinessExpenseReimbursement',
	'type': 'HRCase',
	'title': "Business Expense Reimbursement",
	'service': 'Procurement',
	'category': 'Reimbursements',
	'subcategory': 'Business Expense Reimbursement',
	'tenant': 'ATEC',

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
			'type': 'checkbox',
			'text': 'Would you like to submit a reimbursement?',
			'options': ["yes", "no", "i don't know"]

		}
	]
}