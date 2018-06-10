const bodyParser = require('body-parser');
const credentials = require('./credentials.json');
const express = require('express');

const send = require('gmail-send')({
    user: credentials.user,                  // Your GMail account used to send emails
    pass: credentials.pass,                  // Application-specific password
    to:   credentials.user,                  // Send to yourself
});

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const server = express();
server.use(bodyParser.json());
server.get("/mail", function( req, res ) {
    if(!req.headers.subject || !req.headers.from || !req.headers.body){
        res.status(400).json({error: "missing fields"});
    }
    send({
        subject: req.headers.subject,
        from: req.headers.from,
        text: req.headers.body
    }, (err, res) => {
        res.status(500).json({error: "couldn't send email"});
    });
    res.status(200).json({message: "success!"});
});

server.listen(3000);