const xmlrpc = require('davexmlrpc'),
url = 'https://atecio.utdallas.edu/remote.php',
verb = 'intertiki.validate',
params = ['SERVICEAUTH503490', 'jxj174730', 'D1gitalm@gic', false ] ,
format = 'xml'

xmlrpc.client(url, verb, params, format, ( err, data ) => {
	if(err) { console.log(err)
	}
	else { console.log(JSON.stringify(data))}
})