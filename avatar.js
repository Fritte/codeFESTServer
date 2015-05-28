/**
 * Created by arved on 07.03.15.
 */

var faker = require('faker');
var moment = require('moment');
var random = require('random-js');
faker.locale = "de";

function randomDate(start, end) {
    var timestamp = 
        start.getTime() + 
        (Math.random() * (end.getTime() - start.getTime()));
    return new Date(timestamp);
}

module.exports = {
    getRandomAvatar: function (departureDate) {
        var avatar = {};
        avatar.id = Math.floor(Math.random() * 10000);
        avatar.name = faker.name.findName();
        avatar.email = faker.internet.email(avatar.name);

        avatar.country = "Germany";
        avatar.city= faker.address.city(avatar.country);
        avatar.zipCode = faker.address.zipCode(avatar.city);

        avatar.phoneNumber = faker.phone.phoneNumber();
        avatar.imageUrl = faker.image.avatar();

        avatar.breakEfficiency = faker.random.number(100);
        avatar.accelerationEfficiency = faker.random.number(100);
        avatar.security = faker.random.number(100);


        avatar.v_avg = Math.round(Math.random() * 150 + 100);
        // get a random Date in two +- 1 d
        d = new Date(departureDate);
        d2 = new Date(d);
        d2.setHours(24);
        avatar.travelTime = randomDate(d, d2);
        avatar.travelTime_stamp = new Date(avatar.travelTime).getTime();
        console.log(departureDate);

        return avatar;
    }
};
