module.exports = {
    'name': 'LaptopCartReservation',
	'type': 'Incident',
	'title': "Laptop Cart Reservation",
    'details': "Use this form to schedule a laptop cart reservation. Please answer all questions before clicking submit.",
    // Not 100% sure if service, category, and subcategory are correct here. I believe this is correct, but it may need to be changed.
    'service': 'ATEC Services',
	'category': 'Equipment and Studio Reservation',
	'subcategory': 'Laptop Cart Reservation',
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
            'text': 'Please enter the date for your laptop cart reservation.'
		},
		{
			'type': 'text',
			'text': 'Please enter the time for your laptop cart reservation.'
		},
		{
			'type': 'text',
			'text': 'Please enter the location for your laptop cart reservation.'
		},
		{
			'type': 'text',
			'text': "Please enter the class for your laptop cart reservation."
		},
        {
			'type': 'checkbox',
			'text': 'Please select the laptop carts which you would prefer to check out. Each cart contains 20 devices.',
			'options': ['Windows', 'Mac', 'Mixed'],
		},
		{
			'type': 'textarea',
			'text': 'Please describe any additional needs or requests which you would like us to be aware of.'
        }
	]
}