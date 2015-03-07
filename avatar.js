/**
 * Created by arved on 07.03.15.
 */

var faker = require('faker');
faker.locale = "de";


module.exports = {
    getRandomAvatar: function () {
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

        return avatar;
    }
};