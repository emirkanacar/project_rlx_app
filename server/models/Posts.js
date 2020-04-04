const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');
const PostsSchema = new mongoose.Schema({
    postName: {
        type: String,
        required: true,
        trim: true,
    },
    postAuthor: {
        type: String,
        required: true,
        trim: false
    },
    postTags: {
        type: String,
        required: true,
        trim: false,
    },
    uploadedContents: {
        type: String,
        default: null,
        trim: false
    },
    postContent: {
        type: String,
        required: true,
        trim: false
    },
    postSource: {
        type: String,
        default: null
    },
    postCategory: {
      type: String,
      required: true
    },
    postViewCount: {
        type: Number,
        default: 0
    },
    postCommentCount: {
        type: Number,
        default: 0
    },
},
    {
        minimize: false
    }
);

PostsSchema.plugin(timestamps);
PostsSchema.plugin(mongooseStringQuery);
const Posts = mongoose.model('Posts', PostsSchema);
module.exports = Posts;