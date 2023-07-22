const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
  } = require('../../controllers/users-controller');

// Gos to the /api/users GET, POST routes
router.route('/').get(getAllUsers).post(createUsers);

// Gos to the  /api/users/:id GET, PUT, DELETE routes
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

// Gos to the /api/users/:userId/friends/:friendId POST, DELETE routes
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router; 