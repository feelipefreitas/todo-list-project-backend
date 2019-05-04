const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
// const User = require('../models/user.model');

// const newUser = new User({
//     name: 'Felipe',
//     username: 'feelipe',
//     password: 'fe123',
//     email: 'felipe@.com'
// }).save().then(() => {
//     console.log('Saved')
// })