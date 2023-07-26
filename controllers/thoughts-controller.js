const { Users, Thoughts, Reactions } = require("../models");

const thoughtsController = {
  
    // This is the method to create a new thought and add it to a user
  createThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID, try again!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // This gets all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // this gets thoughts by a specific ID
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // This updates a current thought by a specific ID
  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({ path: "reactions", select: "-__v" })
      .select("-___v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID, please try again!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // this deletes a thought by a specific ID
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // this adds a new reaction to a thought
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID, please try again" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // this deletes a reaction by a specific ID
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtsController;
