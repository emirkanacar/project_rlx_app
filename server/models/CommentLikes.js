const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const CommentLikesSchema = new mongoose.Schema({
   actionOwnerID: {
       type: String,
       required: true
   },
    targetPostID: {
       type: String,
       required: true
    },
    targetCommentID: {
       type: String,
       required: true
    }
}, { minimize: true });

CommentLikesSchema.plugin(mongooseStringQuery);
CommentLikesSchema.plugin(timestamps);
const CommentLikes = mongoose.model('CommentLikes', CommentLikesSchema);
module.exports = CommentLikes;