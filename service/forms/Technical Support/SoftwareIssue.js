module.exports = {
    'name': 'SoftwareIssues',
	'type': 'Incident',
	'title': "Software Issues",
    'details': "Use this form to submit a ticket regarding software issues. Please describe your problem in detail, and answer all questions before clicking submit.",
    // Not 100% sure if service, category, and subcategory are correct here. I believe this is correct, but it may need to be changed.
    'service': 'Technical Support',
	'category': 'Computer Support',
	'subcategory': 'Software Issues',
    'tenant': 'ATEC',
    
    'fields': [
		{
			'name': 'OwnedByTeam',
			'value': 'ATEC Lab Techs'
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
			'text': 'What operating system is your device using?',
			'options': ['Windows', 'Mac'],
        },
        {
            'type': 'text',
            'text': 'Where is your device located?'
        },
        {
            'type': 'text',
            'text': 'What is the asset tag # of your device? (This information can usually be found on a label on top of the machine.)'
        },
		{
			'type': 'textarea',
			'text': 'Please explain your software issue in detail.'
        }
	]
}