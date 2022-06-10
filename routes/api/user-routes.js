const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// /api/users
    //GET all users
    //POST new user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


// /api/users/:id
    //GET single user by _id and populated thought/friend data
    //PUT to update user by its _id
    //DELETE to remove user by its _id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
    //POST to add a new friend to a user's friend list
    //DELETE to remove a friend from a user's friend list
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);


module.exports = router;