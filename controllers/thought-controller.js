const { User, Thought } = require('../models');

const thoughtController = {
    //GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //GET a single thought by _id
    getThoughtById({ params }, res) {
        console.log("params: ",params);
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thought found.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //POST a new thought (push the created thought's _id to the associated user's thoughts array field)
    createThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            console.log("_id", _id);
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: {thoughts: _id } },
                { new: true }
            )
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'user not found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    //PUT to update a thought by the _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thought found.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    //DELETE to remove a thought by the _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thought found.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    //POST to create a reaction stored in a single thought's reactions array field
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thought found.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    //DELETE to pull and remove a reaction by the reaction's reactionId value
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { replyId: params.replyId } } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no thought found.' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;