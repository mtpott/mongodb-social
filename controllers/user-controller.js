const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({path: 'thoughts'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //get one user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({ path: 'thoughts'})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'user not found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    //update user by their id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'user not found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'user not found.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //POST to add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id},
            { $push: 'friends', id}
            //find user by their _id and update the friend array
            //USE $PUSH TO PUSH THE NEW FRIEND TO THE FRIEND ARRAY
        )
    },
    // DELETE to remove a friend from a user's friend list
    removeFriend({ params }, res) {
        User.findByIdAndDelete({
            //find the user by their _id and remove the corresponding friend from the array
        })
    }
};

module.exports = userController;