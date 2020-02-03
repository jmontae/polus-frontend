module.exports = {
	'name': 'BusinessExpenseReimbursement',
	'service': 'Procurement',
	'category': 'Reimbursements',
	'subcategory': 'Business Expense Reimbursement',
	'type': 'HRCase',

	'queries': [
		{
			'type': 'text',
			'text': 'What is your name?'
		},
		{
			'type': 'radio',
			'text': 'Would you like to submit a reimbursement?',
			'options': ["yes", "no", "i don't know"]

		}
	]
}