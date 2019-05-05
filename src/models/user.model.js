const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name of the user is required'],
        minlength: 2,
        trim: true
    },
    username: {
        type: String,
        trim: true,
        required: [true, 'The username is required.']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'The password is required.'],
        minlength: 4,
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('The password cannot be "password".');
        }
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'The email is required'],
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Must be a valid email.');
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//Verifica depois de tentar salvat um novo usuario se o email já está cadastrado
//Se estiver, vai ser enviado um erro
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('The email is already in use'));

    next();
});

//Hashing user password before registering
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8);

    next();
});

//.methods serve para instancias do objeto
//.statics pode ser usado por quem ainda não é instancia do objeto

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

//Generates a new auth token based on user _id and adds to user tokens array 
userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const newToken = await jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({
        token: newToken
    });

    await user.save();

    return newToken;
};

//See if the user is registered based on credentials
userSchema.statics.getUserByCredentials = async (username, email, password) => {
    const user = await User.findOne({
        $or: [{
                username
            },
            {
                email
            }
        ]
    });

    if (!user) throw new Error('Incorrect credentials.');

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) throw new Error('Incorrect credentials.');

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;