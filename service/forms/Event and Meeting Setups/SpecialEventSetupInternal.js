module.exports = {
    'name': 'ATEC Event Request Form',
	'type': 'Incident',
	'title': "ATEC Event Request Form",
    'details': "Use this page to submit an Event Request Form. Please answer all questions before clicking submit.",
	'service': 'Event and Meeting Setups',
	'category': 'Special Events',
	'subcategory': 'Special Event Setup',
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
			'text': 'Department/oversight:'
		},
		{
			'type': 'text',
			'text': 'Contact Person Name'
		},
		{
			'type': 'text',
			'text': 'Contact Email'
		},
		{
			'type': 'text',
			'text': 'Contact Office Number'
		},
		{
			'type': 'text',
			'text': 'Contact Mobile Number'
		},
		{
			'type': 'text',
			'text': 'Event name:'
		},
		{
			'type': 'textarea',
			'text': 'Event description:'
		},
		{
			'type': 'text',
			'text': 'Event date/s:'
		},
		{
			'type': 'text',
			'text': 'Event start time/s'
		},
		{
			'type': 'text',
			'text': 'Event end time/s'
		},
		{
			'type': 'text',
			'text': 'Event location/s:'
		},
		{
			'type': 'text',
			'text': 'Number of guests:'
		},
		{
			'type': 'textarea',
			'text': 'Business justification:'
		},
		{
			'type': 'text',
			'text': 'Budget estimate:'
		},
		{
			'type': 'text',
			'text': 'Cost center #:'
		},
		{
			'type': 'text',
			'text': 'Department/area head approval/Date:'
		},
		{
			'type': 'radio',
			'text': 'Are you requesting ATEC building tours?',
			'options': ['Yes', 'No'],
			'subqueries': [
				{
					'type': 'text',
					'text': 'How many guests?'
				}
			]
		},
		{
			'type': 'checkbox',
			'text': 'Are you requesting any of the following rooms/spaces?',
			'options': ["Lecture hall", "Lecture Hall Green Room", "ATC lobby", "ATC coat check room", "ATC classroom with desktop computers", 
			"ATC classroom without desktop computers", "Conference room"],
		},
		{
			'type': 'checkbox',
			'text': 'Please select your room needs:',
			'options': ["Projector", 'USB/Bluetooth speaker phone', 'Whiteboard', 'None of the above (just a place to meet)']
		},
		{
			'type': 'text',
			'text': "How many Round Cocktail Tables (10) or 6ft Rectangular Tables (10) are you requesting?",
		},
		{
			'type': 'text',
			'text': 'How many chairs (30) are you requesting?'
		},
		{
			'type': 'radio',
			'text': 'Are you requesting risers (3)?',
			'options': ['Yes', 'No'],
			'subqueries': [
				{
					'type': 'text',
					'text': 'How many'
				}
			]
		},
		{
			'type': 'radio',
			'text': 'Are you requesting pipe and drape?',
			'options': ['Yes', 'No']
		},
		{
			'type': 'Radio',
			'text': 'Are you requesting red carpet (2)?',
			'options': ['Yes', 'No'],
			'subqueries': [
				{
					'type': 'text',
					'text': 'How many'
				}
			]
		},
		{
			'type': 'radio',
			'text': 'Are you requesting catering?',
			'note': 'Catering requires a 10-day notice.',
			'options': ['Yes', 'No']
		},
		{
			'type': 'checkbox',
			'text': 'What type of catering are you requesting?',
			'options': ["None", "Coffee cart", "Packaged snacks and bottled water", "Pizza delivery", "Buffet", "Plated w/ wait staff"]
		},
		{
			'type': 'radio',
			'text': 'Do you need linens?',
			'options': ["From Chartwells", "From outside caterer", "From ATEC events team: 10 white/10 black Cocktail table, 10 white/10 Black 6’ Rectangular"],
			'subqueries': [
				{
					'type': 'text',
					'text': 'How many each'
				}
			]
		},
		{
			'type': 'radio',
			'text': 'Do you need ATEC BANNER tablecloth, 3 Black 1 White?',
			'options': ['Yes', 'No'],
			'subqueries': [
				{
					'type': 'text',
					'text': 'How many'
				}
			]
		},
		{
			'type': 'radio',
			'text': 'Will alcoholic beverages be served?',
			'options': ['Yes', 'No']
		},
		{
			'type': 'radio',
			'text': 'Is the event open to the public?',
			'options': ['Yes', 'No']
		},
		{
			'type': 'radio',
			'text': 'Is there an admissions fee?',
			'options': ['Yes', 'No']
		},
		{
			'type': 'radio',
			'text': 'Are you requesting police/guard support?',
			'options': ['Yes', 'No'],
			'subqueries': [
				{
					'type': 'text',
					'text': 'How many'
				}
			]
		},
		{
			'type': 'radio',
			'text': 'Are you requesting EMTs?',
			'options': ['Yes', 'No'],
			'subqueries': [
				{
					'type': 'text',
					'text': 'How many'
				}
			]
		},
		{
			'type': 'radio',
			'text': 'Are you requesting parking passes?',
			'options': ['Yes', 'No'],
			'subqueries': [
				{
					'type': 'text',
					'text': 'How many passes'
				}
			]
		},
		{
			'type': 'radio',
			'text': 'What type of tech support are you requesting?',
			'options': ['None', 'Tech support on-site', 'Set-up only']
		},
		{
			'type': 'checkbox',
			'text': 'Please select which tech services you need: Please contact atec_tech@utdallas.edu to reserve.',
			'options': ['None', 'Microphones', 'Speakers', 'Mobile projector', 'Mobile screen', 'DVD/Blu-ray set-up',
						'Windows laptop cart', 'Mac laptop cart', 'Windows/Mac laptop cart'],
		},
		{
			'type': 'text',
			'text': 'If you selected "Microphones" in the above question, how many Handheld, Lavalier, and/or Catchbox microphones do you need?'
		},
		{
			'type': 'radio',
			'text': 'Do you need a Q&A microphone for audience members?',
			'options': ['Yes', 'No'],
		},
		{
			'type': 'text',
			'text': 'If you responded "Yes" on the previous question, how many Handheld and/or Catchbox microphones do you want to request?'
		},
		{
			'type': 'radio',
			'text': 'Are you requesting communication/marketing support?',
			'note': 'Events recommends having flyers and directional signage for your event. The Communications Department requires a 3-week notice for any digital or print requests.',
			'note': 'If you select "Yes," please visit the Communications page on ATEC IO to complete this part of your event request. Communications will work with you directly.',
			'options': ['Yes', 'No']
		},
		{
			'type': 'checkbox',
			'text': 'Are you requesting any of the following?',
			'options': ["ATEC step-and-repeat", "Small table décor", "Free-standing décor", "Hanging wall décor", "Flowers from Tom Thumb", "Stanchions", "None of the above"]
		},
		{
			'type': 'checkbox',
			'text': 'Are you hiring any of the following?',
			'options': ['Entertainment (i.e. DJ, magician, or band)', "Outside vendor (i.e. food trucks or non-UTD catered service)", "Outside florist", "None of the above"]
		},
		{
			'type': 'text',
			'text': 'If you are hiring one of the services listed in the above question, please identify them here:'
		},
		{
			'type': 'checkbox',
			'text': 'Select which planning maps you need to organize your event:',
			'options': ['None', "UTD campus map", "UTD parking map", "ATEC 1st floor outlet map", "ATEC 1st floor classroom map"]
		}
	]
}