const postModel = require("../../db/models/post");
const likeModel = require("../../db/models/like");
const roleModel = require("../../db/models/role");
const commentModel = require("../../db/models/comment");

const getPosts = (req, res) => {
  postModel
    .find({ isDeleted: false })
    .populate({ path: "user comment like", match: { isDeleted: false } })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(200).json("no posts found");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const createPost = (req, res) => {
  const { title, desc, img, user } = req.body;
  const newPost = new postModel({ title, desc, img, user });
  if (!title || !desc) {
    res.json({ error: "Please fill the fields man" });
  } else {
    newPost
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  postModel
    .find({ _id: id, isDeleted: false })
    .populate({ path: "user comment like", match: { isDeleted: false } })
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).json("no post found");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
    postModel
      .findByIdAndUpdate(id, { $set: { isDeleted: true } })
      .then((result) => {
        if (result) {
          res.status(200).json("post removed");
        } else {
          res.status(200).json("post does not exist");
        }
      })
      .catch((err) => {
        res.status(200).json(err);
      });

};


const giveLikeOrRemove = async (req, res) => {
  const { id } = req.params;
  likeModel
    .findOne({ user: req.user._id, post: id })
    .then((found) => {
      if (found) {
        //if liked before just change to opposite
        likeModel
          .findOneAndDelete({ user: req.user._id, post: id })
          .then((data) => {
            postModel
            .findByIdAndUpdate(id, { $pull: { like: data._id} })
            .then((result) => {
              res.status(201).json({result:"removeLike"});
            })
            .catch((err) => {
              res.status(400).json(err);
            });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        //never been liked, do new like
        const newLike = new likeModel({
          like: true,
          user: req.user._id,
          post: id,
        });
        newLike.save().then((result) => {
          postModel
            .findByIdAndUpdate(id, { $push: { like: result._id } })
            .then((result) => {
              console.log(result);
            });
          res.status(201).json({result:"newLike"});
        });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  deletePost,
  giveLikeOrRemove,
};
