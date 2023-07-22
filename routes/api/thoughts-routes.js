const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughts-controller');

// Gos to the /api/thoughts GET route
router.route('/').get(getAllThoughts).post(createThought);;

// Gos to the /api/thoughts/:id GET, PUT, DELETE routes
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

// Gos to the /api/thoughts/:userId POST route
router.route('/:userId').post(createThoughts);

// Gos to the /api/thoughts/:thoughtId/reactions POST route
router.route('/:thoughtId/reactions').post(addReaction);

// Gos to the /api/thoughts/:thoughtId/reactionId DELETE route
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;