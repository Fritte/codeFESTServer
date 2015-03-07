/**
 * Created by arved on 07.03.15.
 */

var faker = require('faker');
var moment = require('moment');
var random = require('random-js');
faker.locale = "de";

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = {
    getRandomAvatar: function (departureDate) {
        var avatar = {};
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

        // get a random Date in two +- 1 d
        d = new Date(departureDate);
        avatar.travelTime = randomDate(d, d);
        console.log(departureDate);

        return avatar;
    }
};