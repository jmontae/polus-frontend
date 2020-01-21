require('dotenv').config();
let child_process = require('child_process'),
bodyparser = require('body-parser');
user = process.env.GITHUB_USER,
port = process.env.WEBHOOK_PORT;

let app = require('express')();
app.use(bodyparser.json());
/**
 * post /update
 * when there's been an update to the repo, this endpoint is hit.
 * it will: 1. make a pull request, 2. rebuild the frontend, 3. restart the server
 */
app.post('/update', (req, res) => {
	let sender = req.body.sender,
	branch = req.body.ref;

	if(sender.login === user) {
		child_process.exec('./deploy.sh', (err, stdout, stderr) => {
			if(err) {
				console.error(err);
				return res.send(500);
			} else {
				res.send(200);
			}
		});
	}
});

app.get('/', (req, res) => {
	res.status(200).send('this is the cherwell app webhook endpoint. nothing to see here.');
});

app.get('/update', (req, res) => {
    res.status(200).send("this route works fine...");
});
app.listen(port);
