const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html');
})
app.post('/', function (req, res) {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }

        }]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/4ac01863ba";
    const options = {
        method: 'POST',
        auth: 'khaled:cdfa9b7b13c381005215defcd61fc980-us14'
    }
    const request = https.request(url, options, (response) => {
        response.on('data', (data) => {
            if(response.statusCode === 200){
                res.sendFile(__dirname + '/success.html');
            } else {
                res.sendFile(__dirname + '/failure.html');
            }

            console.log(JSON.parse(data));
        })

    })
   request.write(jsonData);
   request.end();
})
app.post('/failure', function (req, res) {
    res.redirect('/');
})
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 30000');

})
// id 4ac01863ba
// api key cdfa9b7b13c381005215defcd61fc980-us14