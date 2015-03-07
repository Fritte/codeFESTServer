/**
 * Created by arved on 07.03.15.
 */
var express = require('express');
var app = express();
var avatar = require('./avatar');
var jquery = require('jquery');
var request = require('request');

var port = 3000 || process.argv[0];

/**
 * return a Random Avatar
 */
app.get('/getNextUser', function (req, res) {

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

    /** jquery.ajax({
        dataType: "json",
        type: "GET",
        url: "http://maps.googleapis.com/maps/api/distancematrix/",
        data:{
          destination: destination,
          origin:origin,
          mode: "car",
          language: "ger-GER",
          sensor: "true"
        },
        success: function(data){
            console.log(JSON.stringify(data));
        }
    }); **/

    request("http://maps.googleapis.com/maps/api/distancematrix/" +
    "json?origins=" + origin +
    "&destinations=Berlin" + destination +
    "&mode=car&language=ger-Ger&sensor=false", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var responseFromServer= JSON.parse(body);

            var profile = avatar.getRandomAvatar(departureDate);
            profile.distance = responseFromServer.rows[0].elements[0].distance.text;
            profile.estimatedDuration = responseFromServer.rows[0].elements[0].duration.text;
            console.log (profile.distance);
            console.log(profile.estimatedDuration);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(profile));
        } else {
            console.log(body);
        }

    });
});

app.listen(port);

console.log('Server started: http://localhost:3000/');