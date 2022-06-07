const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    //username --> string; unique; required; trimmed
    username: {
        type: String,
        unique: true,
        required: 'a username is required.',
        trim: true
    },
    email: {
        //email --> string; unique; required; must match valid email address
        type: String,
        unique: true,
        required: 'an email is required.',
        match: [/.+@.+\..+/, 'please enter a valid email address.']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    }
});

//virtual called friendCount that retrieves the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
})

const User = model ('user', UserSchema);

module.exports = User;
