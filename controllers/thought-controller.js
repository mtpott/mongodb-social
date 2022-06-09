const { Thought } = require('../models');

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
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
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
    }
};

module.exports = thoughtController;