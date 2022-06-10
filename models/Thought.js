const { Schema, model, Types } = require('mongoose');
const { format } = require('date-fns');

//reaction schema-->not a model, but used as reaction field's subdoc schema in this model
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, 'reactions can only be 280 characters.']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => format(createdAtVal, 'MM.dd.yyyy hh:mm a')
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
})


const ThoughtSchema = new Schema({
    //thoughtText --> string; required; must be btwn 1-280 characters
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: [280, 'thought must be between 1 and 280 characters.']
    },
    //createdAt --> date, set default value to the current timestamp, use a getter method to formt timestamp on query
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => format(createdAtVal, 'MM.dd.yyyy hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})

//reactionCount virtual that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;