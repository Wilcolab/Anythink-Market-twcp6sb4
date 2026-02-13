/**
 * Express router for handling comment-related API endpoints.
 * 
 * Provides CRUD operations for comments including fetching all comments,
 * creating new comments, and deleting comments by ID.
 * 
 * @typedef {Object} Comment
 * @property {string} _id - The comment's unique identifier
 * @property {string} content - The comment content
 * @property {string} author - The comment author
 * 
 * @route GET /
 * @returns {Promise<Array<Comment>>} 200 - Array of all comments
 * @returns {Object} 500 - Error message if fetch fails
 * 
 * @route POST /
 * @param {Comment} req.body - The comment object to create
 * @returns {Promise<Comment>} 201 - The created comment with ID
 * @returns {Object} 500 - Error message if creation fails
 * 
 * @route DELETE /:id
 * @param {string} req.params.id - The ID of the comment to delete
 * @returns {Object} 200 - Success message confirming deletion
 * @returns {Object} 500 - Error message if deletion fails
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});
router.post("/", async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: "Failed to create comment" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const commentId = req.params.id;
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});

