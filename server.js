/**
 * Created by arved on 07.03.15.
 */
var express = require('express');
var app = express();
var avatar = require('./avatar');
var request = require('request');
var fs = require('fs');
var path = require('path');

var port = 3000 || process.argv[0];

/**
 * return a Random Avatar
 */
app.get('/getNextPage', function (req, res) {
    var origin = req.query["origin"];
    var destination = req.query["destination"];
    var departureDate = req.query["departureDate"];
    /**
     * check if params destination and origin are specified
     */
    if (typeof departureDate == 'undefined' ){
        res.status(404).send("departureDate param not found");
        return;
    }
    departureDate = new Date(departureDate);
    if (typeof origin === 'undefined') {
        res.status(404).send("origin param not found");
        return;
    }
    if (typeof destination === 'undefined') {
        res.status(404).send("destination param not found");
        return;
    }
    var profiles = [];
console.log("buh!");
    request("http://maps.googleapis.com/maps/api/distancematrix/" +
    "json?origins=" + origin +
    "&destinations=Berlin" + destination +
    "&mode=car&language=ger-Ger&sensor=false", function (error, response, body) {
        console.log(body);
        for(var i=0; i<10; i++) {
            if (!error && response.statusCode == 200) {
                var responseFromServer = JSON.parse(body);
                var profile = avatar.getRandomAvatar(departureDate);
                profile.distance = responseFromServer.rows[0].elements[0].distance.text;
                profile.estimatedDuration = responseFromServer.rows[0].elements[0].duration.text;
                profile.estimatedDuration_stamp = profile.estimatedDuration.match(/[0-9]+/g);
                profile.estimatedDuration_stamp = (profile.estimatedDuration_stamp[0] * 3600) + (profile.estimatedDuration_stamp[1] * 60);
                profile.estimatedDuration_stamp += Math.random() * 600;
                profiles.push(profile)

            } else {
                console.log(body);
            }
        }
        console.log(profile.distance);
        console.log(profile.estimatedDuration);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(profiles));
    });
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use('/', express.static(path.join(__dirname, 'src')));

app.listen(port);

console.log('Server started: http://localhost:3000/');
