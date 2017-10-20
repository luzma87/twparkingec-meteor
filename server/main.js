import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {
    if (Meteor.users.find().count() === 0) {
        JSON.parse(Assets.getText("users.json")).users.forEach((user) => {
            Accounts.createUser({
                username: user.name,
                password: '123456'
            });
        });
    }
});
