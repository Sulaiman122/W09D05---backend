const commentModel = require("../../db/models/comment");
const roleModel = require("../../db/models/role");
const postModel = require("../../db/models/post");


const getComments = (req, res) => {
  commentModel.find({ post: req.body.postID, isDeleted:false }).populate('user')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const createComment = (req, res) => {
  const { id } = req.params;
  const { comment, username } = req.body;

  const newComment = new commentModel({
    comment,
    user: username,
    post: id,
  });
  newComment
    .save()
    .then((result) => {
      postModel
        .findByIdAndUpdate(id, { $push: { comment: result._id } })
        .then((result) => {
          console.log(result);
        });
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
    commentModel
      .findByIdAndUpdate(id, { $set: { isDeleted: true } })
      .then((result) => {
        if (result) {
          res.status(200).json("comment removed");
        } else {
          res.status(200).json("comment does not exist");
        }
      })
      .catch((err) => {
        res.status(200).json(err);
      });
};


const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
    commentModel
      .findByIdAndUpdate(id, { $set: { comment: comment } })
      .then((result) => {
        if (result) {
          res.status(200).json("comment updated");
        } else {
          res.status(404).json("comment does not exist");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
};


module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComments,
};
