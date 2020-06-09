module.exports = {
    'name': 'ConferenceCallSetup',
	'type': 'Incident',
	'title': "Conference Call Setup",
    'details': "Use this form to schedule technical support for conference calls. Please answer all questions before clicking submit.",
    // Not 100% sure if service, category, and subcategory are correct here. I believe this is correct, but it may need to be changed.
    'service': 'ATEC Services',
	'category': 'Event and Meeting Setups',
	'subcategory': 'Conference Call Setup',
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
            'type': 'text',
            'text': 'Please enter the date for your conference call.'
		},
		{
			'type': 'text',
			'text': 'Please enter the time for your conference call.'
		},
		{
			'type': 'text',
			'text': 'Please enter the location for your conference call.'
		},
        {
			'type': 'radio',
			'text': 'Will you be using your own device for the conference call, or would you like us to provide a laptop?',
			'options': ['I will be using my own device.', 'Please provide me with a device.'],
		},
		{
			'type': 'radio',
			'text': 'Which application will you be using for your conference call?',
			'options': ['Skype', 'WebEX', 'Teams'],
		},
		{
            'type': 'text',
            'text': 'Please enter the contact information for who you will be calling.'
        },
		{
			'type': 'textarea',
			'text': 'Please describe any additional needs or requests which you would like us to be aware of.'
        }
	]
}